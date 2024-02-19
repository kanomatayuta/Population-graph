import React from "react"; // Reactライブラリをインポート。
import HighchartsReact from "highcharts-react-official"; // HighchartsのReactラッパーをインポート。
import Highcharts from "highcharts"; // Highchartsライブラリをインポート。

//コンポーネントが受け取るpropsの型を定義。
interface Props {
  population: { prefName: string; data: { year: number; value: number }[] }[];
}

const Graph: React.FC<Props> = ({ population }) => {
  const series: Highcharts.SeriesOptionsType[] = []; // Highchartsのシリーズオプションの配列を初期化。
  // population配列の各要素に対してループを実行。
  for (const p of population) {
    const data = []; // data配列を初期化。
    // p.dataの各要素に対してループを実行。
    for (let pd of p.data) {
      // pd.valueをdata配列に追加。
      data.push(pd.value);
      // console.log(pd.year);
      // console.log(pd.value);
    }
    series.push({
      type: "line", // チャートのタイプを指定。
      name: p.prefName, // シリーズの名前を指定。
      data: data, // シリーズのデータを指定。
    });
  }

  // Highchartsのオプションを定義。
  const options: Highcharts.Options = {
    title: {
      text: "総人口推移", // チャートのタイトル。
    },
    xAxis: {
      title: {
        text: "年度", // x軸のタイトル。
      },
      categories: population[0]?.data.map((pd) => String(pd.year)), // x軸のカテゴリを指定。
    },
    yAxis: {
      title: {
        text: "人口数", // y軸のタイトル。
      },
    },
    tooltip: {
      valueSuffix: "人", // ツールチップの値の接尾辞を指定。
    },
    // チャートのシリーズを指定。
    series:
      // seriesが空の場合、デフォルトのシリーズを設定。
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : // seriesが空でない場合、seriesをそのまま使用。
          series,
  };
  // HighchartsReactコンポーネントをレンダリング。
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph; // Graphコンポーネントをエクスポート。
