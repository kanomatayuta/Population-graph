import React from "react"; // Reactライブラリをインポート。

// インターフェースを定義。コンポーネントが受け取るpropsの型を定義。
interface Props {
  // 都道府県のデータを表すオブジェクトの配列。
  prefectures: {
    prefCode: number; // 都道府県コード
    prefName: string; // 都道府県名
  }[];
  // チェックボックスの状態が変更されたときに呼び出される関数。
  onChange: (prefName: string, prefCpde: number, check: boolean) => void;
}

const Styles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  padding: "10px",
  justifyContent: "flex-start",
  justifySelf: "auto",
};
const PrefStyles: React.CSSProperties = {
  padding: "13px",
};

// CheckBoxとコンポーネントを定義。propsを受取。
const CheckBox: React.FC<Props> = ({ prefectures, onChange }) => {
  return (
    <div style={Styles}>
      {
        // 都道府県のデータをmap関数でループ処理。
        prefectures.map((prefecture) => (
          //key属性には都道府県コードを設定
          <div key={prefecture.prefCode} style={PrefStyles}>
            <input
              type="checkbox"
              onChange={(event) =>
                onChange(
                  prefecture.prefName, // 都道府県名引数
                  prefecture.prefCode, //都道府県コード
                  event.target.checked // チェックボックスの状態
                )
              }
            ></input>
            <label>{prefecture.prefName}</label>
          </div>
        ))
      }
    </div>
  );
};
export default CheckBox; // CheckBoxコンポーネントをエクスポート。
