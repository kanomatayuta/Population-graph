import CheckBox from "@/components/CheckBox"; // CheckBoxコンポーネントをインポート。
import { useState } from "react"; // useStateフックをインポート。
import axios from "axios"; // axiosライブラリをインポート。HTTPリクエストを行うためのライブラリ。

interface PrefectureSelectorProps {
  prefectures: {
    prefCode: number; // 都道府県コード
    prefName: string; // 都道府県名
  }[];
  onPopulationChange: (
    // 都道府県の名前と年ごとの人口データの配列を引数に取得。
    population: { prefName: string; data: { year: number; value: number }[] }[]
  ) => void;
}

// PrefectureSelectorコンポーネントを定義。
const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
  prefectures,
  onPopulationChange,
}) => {
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);

  // 都道府県のチェックボックスの状態が変更されたときに呼び出されるハンドラ関数を定義。
  const handler = (prefName: string, prefCode: number, check: boolean) => {
    // 現在の人口データのステートをコピー。
    const c_prefPopulation = prefPopulation.slice();
    // チェックボックスがチェックされた場合、都道府県の人口データを取得。
    if (check) {
      // API 都道府県コードを取得。
      axios
        .get(
          // RESASのAPIから指定した「都道府県の人口データ」を取得。
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
            String(prefCode),
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY,
            },
          }
        )
        // thenで成功した場合の処理。
        .then((res) => {
          // データの取得に成功した場合、取得したデータをステートに追加。
          c_prefPopulation.push({
            prefName: prefName,
            data: res.data.result.data[0].data,
          });
          setPrefPopulation(c_prefPopulation);
          onPopulationChange(c_prefPopulation);
        })
        // catchでエラー時の挙動を定義。
        .catch((error) => {
          return;
        });
    } else {
      const deleteIndex = c_prefPopulation.findIndex(
        (value) => value.prefName === prefName
      );
      c_prefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(c_prefPopulation);
      onPopulationChange(c_prefPopulation);
    }
  };

  return <CheckBox prefectures={prefectures} onChange={handler} />;
};

export default PrefectureSelector;
