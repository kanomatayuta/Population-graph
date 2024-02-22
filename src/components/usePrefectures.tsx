import { useState, useEffect } from "react"; // useStateとuseEffectフックをインポート。
import axios from "axios"; // axiosライブラリをインポート。HTTPリクエストを行うためのライブラリ。

// usePrefecturesというカスタムフックをエクスポート。
export const usePrefectures = () => {
  // 都道府県のデータを保持するためのステートを定義。
  const [prefectures, setPreFectures] = useState<{
    result: {
      prefCode: number; // 都道府県コード
      prefName: string; // 都道府県名
    }[];
  } | null>(null);

  // useEffectフックを使用して、コンポーネントのマウント時に都道府県のデータを取得。
  useEffect(() => {
    // API 都道府県一覧を取得。
    axios
      // RESAS(地域経済分析システム)のAPIから都道府県一覧を取得。
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": "API-KEYを入力" },
      })
      // thenで成功した場合の処理
      .then((results) => {
        // データの取得に成功した場合、取得したデータをステートにセット。
        setPreFectures(results.data);
      })
      // catchでエラー時の挙動を定義
      .catch((error) => {});
  }, []);

  return prefectures;
};
