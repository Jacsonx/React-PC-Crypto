import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface CoinDataChartsProps {
  data?: number[];
  isPositive?: boolean;
}

const CoinDataCharts: React.FC<CoinDataChartsProps> = ({ data, isPositive }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current!);
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    //Mocked values for demonstration
    const mockPositiveData = [
      50, 120, 80, 150, 200, 130, 250, 180, 300, 260, 120, 290, 30, 70, 20, 280, 150, 10, 280, 170, 90, 80, 410, 530,
    ];
    
    const mockNegativeData = [
      500, 450, 80, 400, 70, 420, 50, 380, 80, 30, 70, 300, 90, 280, 200, 230, 90, 210, 70, 200, 60, 150, 140, 20,
    ];

    const chartData = data || (isPositive ? mockPositiveData : mockNegativeData);
    const isChartPositive = chartData[chartData.length - 1] >= chartData[0];

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      grid: {
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '0%',
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      series: [
        {
          data: chartData,
          type: 'line',
          smooth: false,
          lineStyle: {
            color: isChartPositive ? '#15D28F' : '#FF5B5B',
            width: 2,
          },
          areaStyle: {
            color: isChartPositive ? 'rgba(21, 210, 143, 0.2)' : 'rgba(255, 91, 91, 0.2)',
          },
          showSymbol: false,
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, [data, isPositive]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '180px',
        height: '60px',
        alignSelf: 'flex-end',
      }}
    />
  );
};

export default CoinDataCharts;
