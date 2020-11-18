### 一.项目结构
#### 1.1目录结构
components 放之后的公共组件
assets 放一些资源
service 放网络请求的一些的一些东西
util 放工具相关的东西

#### 1.2划分项目的页面结构
pages/home/home 首页
pages/category/category 分类
pages/cart/cart 购物车
pages/profile/profile 我的

### 二.首页完成
#### 2.1轮播图
1.请求轮播图相关的数据
网络请求的封装
```javascript
export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}
```
新建工具类home.js
```javascript
 import request from './network.js'
 export function getMuliData() {
   return request({
     url: '/home/multidata'
   })
 }
```
取出轮播图和推荐的数据,将数据放到data中,
在轮播图中使用了小程序的组件swiper,
circular 让轮播图可以衔接滚动
autoplay 自动切换
interval='3000' 自动切换间隔为3秒
duration='300' 滑动动画时长300毫秒
indicator-dots 显示面板指示点
indicator-active-color='#ff5777' 当前选中的指示点颜色和主题颜色一致
相关代码如下
```javascript
<swiper class="swiper" circular autoplay interval='3000' duration='300' indicator-dots indicator-active-color='#ff5777'>
  <block wx:for="{{ list }}" wx:key="index">
    <swiper-item class="swiper-item">
      <image src="{{ item.image }}" mode="widthFix" />
    </swiper-item>
  </block>
</swiper>
```
因为在以后的其它页面中也需要使用轮播图，例如详情页，使用在这里我把轮播图封装到了
components/fly-swiper公共组件中,使用组件只需要传入数组即可。
#### 2.2.推荐数据的展示
```javascript
.recommend {
  display: flex;
  margin-top: 40rpx;
  padding-bottom: 40rpx;
  border-bottom:16rpx solid #eee;
}

.recommend-item {
  flex: 1;
  text-align: center;
}
```
#### 2.3.展示本周流行
。。。。数据就一张图片
#### 2.4tab-control
在tab-control组件中，使用全局变量currentIndex控制板块的active样式，当下标等于currentIndex时，存在active样式，另外给子组件监听点击，点击时改变currentIndex的值为，子组件自定义样式data-index的值，完成tab切换
```wxml
<view class="tab-control">
  <block wx:for="{{ titles }}" wx:key="index">
    <view class="tab-item {{ index == currentIndex?'active':'' }}" bindtap="itemClick" data-index="{{ index }}">
      <text class="text">{{ item }}</text>
    </view>
  </block>
</view>
```
在做样式时使用了一点小技巧,给组件加了内边距，然后再添加下边框
```css
.tab-item.active .text {
  padding: 16rpx 10rpx;
  border-bottom: 6rpx solid #ff5777;
}
```
#### 2.5商品数据展示
1.数据模型的设计
```js
goods:{
	'pop':{page:0,list:[]},
	'new':{page:0,list:[]},
	'sell':{page:0,list:[]},
}
```
2.发送网络请求，将数据存储起来
```js
_getGoodsData(type) {
    //1.获取页码
    const page = this.data.goods[type].page + 1;

    //2.发送网络请求
    getGoodsData(type, page).then(res => {
      //2.1.取出数据
      const list = res.data.data.list;

      //2.2将数据设置到对应type的list里面
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      //2.3将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  }
```
在数据请求的时候封装了一个函数，传入type类型即可返回数据，在设置数据是考虑到数据的改变是局部的，例如type值为pop时，只改变goods.pop.page和goods.pop.list,作用再setData之前先提取出来两个需要重新改变的值，在设置的时候使用中括号包裹.
3.展示商品数据
封装组件展示商品数据
```html
<view class="goods-item">
  <image class="image" src="{{ item.show.img }}" mode="widthFix" />
  <view class="desc-info">
    <view class="title">{{ item.title }}</view>
    <view class="info">
      <text class="price">¥{{ item.price }}</text>
      <image class="icon" src="/assets/common/favor.png" />
      <text class="cfav">{{ item.cfav }}</text>
    </view>
  </view>
</view>
```
在写样式时遇到的问题：
对于商品数据中收藏的图片写样式时遇到了一些问题，本来打算使用伪元素在收藏的数据前添加一个icon 的，但是在写样式的时候遇到了一些问题，在wxss中不能引用本地图片，只能引用网络图片
```css
.cfav::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("/assets/common/favor.png") 0 0/14px 14px;
} 
```
以上写法在wxss中会报错，最后解决的时候直接在封装的组件中添加了image组件。
#### 2.6上拉加载更多
在做上拉加载更多时，使用了小程序的会滴函数onReachBottom(页面上拉触底事件的处理函数),然后直接调用上一步封装好的函数
```js
this._getGoodsData(this.data.currentType)
```
currentType保存的type属性值。

#### 2.7回到顶部
调用官方函数wx.pageScrollTo将页面滚动到目标位置
```js
 wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
```
控制按钮的显示和隐藏，在官方的回调函数onPageScroll中监听滚动的距离，控制显示和隐藏
注意点：在滚动的函数回调中频繁的调用setData
解决方案
```js
const flag1 = scrollTop >= TOP_DISTANCE
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }
```
在每次要更改数据时，更改后的结果和更改前的结果是否一致，如果一致，则不进行更改。
#### 2.8tab-control停留效果
在回到顶部中，使用了wx:if控制按钮的显示和隐藏，因为hidden对于自定义组件是无效的，另外获取组件距离页面的高度是通过以下方式获取的，利用exec()执行回调函数;
```js
 wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
```
在获取自定义组件距离页面高度时遇到的问题？
原先获取组件高度是在页面显示出来时获取的，但是由于图片加载的影响，获取出来的高度是不正确的。
解决方式：因为顶部使用的是官方的轮播插件swiper，有默认的高度（在之后为了美观，也给了一个rpx的高度），本周流行组件中用的也是本地的图片，唯一要注意的就是推荐数据，在推荐数据的图片中设置了监听图片加载完毕，加载完毕时利用triggerEvent自定义触发事件，监听触发事件，在触发事件中获取自定义组件距离页面的高度.
得到高度后，通过滚动的距离给组件添加class样式fixed通过data数据isTabFixed控制
```js
 const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
```
在做组件停留中遇到的问题
当给自定义组件添加样式时，会脱离文档流，造成后面样式前移。
解决方案，在自定义组件下方再添加一个自定义组件，达到占位的效果
```html
<!-- 4.tab-control -->
<fly-tab-control titles="{{ titles }}" bind:tabClick="handleTabClick" class="{{ isTabFixed?'fixed':'' }}" id="tab-control" />
<fly-tab-control titles="{{ titles }}" wx:if="{{ isTabFixed }}"/>
```
至此，首页完成。


