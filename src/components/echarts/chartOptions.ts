import type { EChartsOption } from 'echarts'
export function getPieChartOption(pieDatas: any[]) {
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

export function getLineChartOption(lineData: any[]) {
  const option: EChartsOption = {
    grid: {
      left: '5%',
      right: '1%',
      top: '20%',
      bottom: '15%',
      containLabel: true // grid 区域是否包含坐标轴的刻度标签
    },
    legend: {
      right: 'center',
      bottom: '5%',
      itemGap: 20,
      itemWidth: 13,
      textStyle: {
        color: '#64BCFF'
      },
      icon: 'rect'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#20FF89'
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#64BCFF'
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          color: '#64BCFF'
        }
      }
    ],
    series: [
      {
        name: lineData[0].name,
        type: 'line',
        smooth: true,
        stack: '总量',
        symbolSize: 5,
        showSymbol: false,
        itemStyle: {
          color: '#20FF89'
        },
        lineStyle: {
          color: '#20FF89',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#20FF89'
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
              }
            ]
          }
        },
        data: lineData[0].data
      },
      {
        name: lineData[1].name,
        type: 'line',
        smooth: true,
        stack: '总量',
        symbolSize: 5,
        showSymbol: false,
        itemStyle: {
          color: '#EA9502'
        },
        lineStyle: {
          color: '#EA9502',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#EA9502'
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
              }
            ]
          }
        },
        data: lineData[1].data
      }
    ]
  }
  return option
}
