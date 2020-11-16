// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:['衣服','裤子','鞋子']
  },
  handleBtnClick(){
    console.log('按钮发生点击')
  },
  handleTouchStart(){
    console.log("handleTouchStart");
  },
  handleTouchMove(){
    console.log("handleTouchMove");
  },
  handleTouchEnd(){
    console.log("handleTouchEnd");
  },
  handleTap(){
    console.log("handleTap");
  },
  handleLongpress(){
    console.log("handleLongpress");
  },
  handleEventClick(event){
    console.log('--------',event);
  },
  handleEventEnd(event){
    console.log('++++++++',event);
  },
  handleInner(event){
    console.log(event);
  },
  handleouter(event){
    console.log(event);
    
  },
  handlebox2(event){
    console.log(event);
  },
  handleItemClick(event){
    console.log(event);
    // title - index
    const dataset = event.currentTarget.dataset;
    const title = dataset.item;
    const index = dataset.index;
    console.log(title,index);
  }
})