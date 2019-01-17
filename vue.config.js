module.exports = {
  css:{
    loaderOptions:{
      sass: {
        // 导入配置文件
        data:'@import "./src/lib/hotcss/px2rem.scss";'
        // data:'@import "./src/assets/style/color.scss";'
      }
    }
  }
};
