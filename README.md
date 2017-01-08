# PhotoshopJSX-ConvertPNGtoAnimation

このプログラムは [Adobe Photoshop](http://www.adobe.com/jp/products/photoshop.html) で動作する JavaScript(JSX) です。
実行するとJSXファイルと同階層の「`resource`」フォルダ内にある png ファイルを一つの psd ドキュメント内にまとめてフレームアニメーション化して psd と gif を出力します。

## 注意 （cautionn）

* 本プログラムご使用は自己責任でお願いいたします

## インストール （Installation）

1. このページの `Clone or download` ボタンよりリポジトリのクローンもしくはZIPダウンロードをします。
2. ZIPダウンロードの場合は解凍をします。
3. 解凍して出来たフォルダの中に「`ConvertPNGtoAnimation.jsx`」があれば完了です。

## 使用法 （Usage）

すでに「resource」フォルダ内にサンプルのpngファイルを用意しているので、JSXファイルをダブルクリックか Photoshop 内へドラッグ＆ドロップして実行することで効果を確認できます。
JSXファイルと同階層に実行時の日時の psd ファイルと gif ファイルが出力されれば成功です。

## 仕様 (specification)

* `ConvertPNGtoAnimation.jsx` がメインの実行ファイル
* `resource` フォルダ内の `png` ファイルを Photoshop 内へ読み込む
* 処理が成功するとJSXファイルと同階層に実行日時名の psd と gif(256色) ファイルが出力される
* フレームアニメーションは「1秒フレーム送り / 無限ループ」に設定してある

## コピーライト （Copyright）
Copyright © 2017+ Tsutomu Takanashi. See LICENSE for details.
