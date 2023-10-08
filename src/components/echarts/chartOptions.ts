import type { EChartsOption } from 'echarts'
export function getPieChartOption(pieDatas: any[] = []) {
  const colors = pieDatas.map((item) => item.color)
  const data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name
    }
  })
  const total = pieDatas.reduce((pre, cur) => pre + +cur.value, 0)
  const option: EChartsOption = {
    color: colors,
    tooltip: {},
    legend: {
      orient: 'vertical',
      right: '10%',
      top: '18%',
      itemGap: 20,
      itemWidth: 20,
      icon: 'rect',
      formatter: function (name) {
        const currentItem = pieDatas.find((item) => item.name === name)
        return (
          '{nameSty|' +
          currentItem.name +
          '}\n' +
          '{numberSty|' +
          currentItem.value +
          '个 }' +
          '{preSty|' +
          currentItem.percentage +
          '}'
        )
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: '#FFFFFF',
            padding: [10, 14]
          },
          numberSty: {
            fontSize: 12,
            color: '#40E6ff',
            padding: [0, 0, 0, 14]
          },
          preSty: {
            fontSize: 12,
            color: '#40E6ff'
          }
        }
      }
    },
    title: {
      text: `{nameSty|充电桩总数}\n{numberSty|${total}}`,
      top: '50%',
      left: '30%',
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: '#fff',
            padding: [10, 0]
          },
          numberSty: {
            fontSize: 24,
            color: 'white',
            padding: [2, 0, 0, 20]
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        label: {
          show: false
        },
        data: data,
        roseType: 'area',
        center: ['40%', '57%'],
        radius: ['30%', '75%']
      }
    ]
  }
  return option
}
