import Graph from "@/components/Graph"; // CheckBoxコンポーネントをインポート。
import PrefectureSelector from "@/components/PrefectureSelector"; // PrefectureSelectorコンポーネントをインポート。
import { usePrefectures } from "@/components/usePrefectures"; // usePrefecturesコンポーネントをインポート。
import { useState } from "react"; // useStateフックをインポート。

// Homeという名前のReact関数コンポーネントを定義。
const Home: React.FC = () => {
  // usePrefecturesフックを使用して、都道府県データを取得。
  const prefectures = usePrefectures();
  // useStateフックを使用して、population変数と、それを更新するためのsetPopulation関数を定義。
  const [population, setPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);

  // refecturesが存在する場合、PrefectureSelectorコンポーネントをレンダリング。
  // Graphコンポーネントをレンダリング。
  return (
    <>
      <header>
        <h1>都道府県別の総人口推移</h1>
      </header>
      <main>
        <div>
          <h2>都道府県</h2>
          {prefectures && (
            <PrefectureSelector
              prefectures={prefectures.result}
              onPopulationChange={setPopulation}
            />
          )}
        </div>
        <div>
          <h2>人口推移グラフ</h2>
          <Graph population={population}></Graph>
        </div>
      </main>
    </>
  );
};

export default Home;
