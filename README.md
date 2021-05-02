# PhotoshopJSX-ConvertPNGtoAnimation

このプログラムは [Adobe Photoshop](http://www.adobe.com/jp/products/photoshop.html) で動作する JavaScript(JSX) です。
実行するとJSXファイルと同階層の「`resource`」フォルダ内にある png ファイルを一つの psd ドキュメント内にまとめてフレームアニメーション化して psd と gif を出力します。
<br><br><br>



▽動作確認済み
* Adobe Photoshop CC 2015 （Windows10）
* Adobe Photoshop CC 2017 （Windows10、OSX El Capitan(v10.11.6)）
<br><br><br>



## 解説サイト
![ConvertPNGtoAnimation_Usage-Sample](https://user-images.githubusercontent.com/5539081/116813053-d7400400-ab8c-11eb-886b-78692ed058cc.gif)

[[Photoshop][JSX] 複数のpngを一つのpsdにまとめてgif書き出しをするスクリプト「ConvertPNGtoAnimation」 | これを読めば思い出す](http://www.koreyome.com/web/photoshop-jsx-convertpngtoanimation/)
<br><br><br>




## 注意 （cautionn）

* 本プログラムご使用は自己責任でお願いいたします
<br><br><br>




## インストール （Installation）

1. このページの `Clone or download` ボタンよりリポジトリのクローンもしくはZIPダウンロードをします。
2. ZIPダウンロードの場合は解凍をします。
3. 解凍して出来たフォルダの中に「`ConvertPNGtoAnimation.jsx`」があれば完了です。
<br><br><br>




## 使用法 （Usage）

* 「`ConvertPNGtoAnimation.jsx`」をダブルクリックか Photoshop 内へドラッグ＆ドロップして実行

すでに「resource」フォルダ内にサンプルのpngファイルを用意しているので、JSXファイルを実行することで効果を確認できます。
JSXファイルと同階層に実行時の日時の psd ファイルと gif ファイルが出力されれば成功です。
<br><br><br>




## 仕様 (specification)

* `ConvertPNGtoAnimation.jsx` がメインの実行ファイル
* `resource` フォルダ内の `png` ファイルを Photoshop 内へ読み込む （サンプルpng用意済）
* pngファイルの読み込みの順番はファイル名の昇順
* psdファイルは一番最初に読み込んだpngファイルのドキュメントサイズ・解像度を踏襲している
* フレームアニメーションは「各フレーム1秒送り / 無限ループ」に設定してある
* 処理が成功するとJSXファイルと同階層に実行日時名の psd と gif(256色) ファイルが出力される
<br><br><br>




## コピーライト （Copyright）
Copyright © 2017+ Tsutomu Takanashi. See LICENSE for details.
