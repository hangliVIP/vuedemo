<template>
  <div class="home">
    <H1>首页</H1>

    <div class="main-bd">
      <div class="data_wrap">
        {{getYearMonth}}
      </div>
    </div>

    <div id="pie" ref="pie_wrap"></div>
  </div>
</template>


<script>
  // 引入 ECharts 主模块
  import echarts from 'echarts/lib/echarts';
  // 引入饼状图
  import 'echarts/lib/chart/pie';
  // 引入提示框和标题组件
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/title';

  export default {
    name: "Home",
    computed: {
      getYearMonth() {
        let t = new Date();
        return '${t.getFullYear()}年${t.getMonth()+1}月';
      }
    },
    mounted() {
// 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.pie_wrap);  // document必须设置宽和高
      // 绘制图表
      myChart.setOption({
        color: ['rgb(102,208,113)', 'rgb(223,223,223)'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['92%', '98%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'

              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 30, name: ''},
              {value: 70, name: ''}
            ]
          }
        ]
      });
    }
  };
</script>

<style lang="scss" scoped>
  .main-bd {
    background: #55a532;

    .data-wrap {
      padding: 40px 0 22px;
      color: #333333;
      text-align: center;

    }
  }


  #pie {
    width: 500px;
    height: 400px;
  }

</style>
