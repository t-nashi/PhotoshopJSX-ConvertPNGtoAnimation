#target photoshop
app.bringToFront();	//アプリケーション(photoshop)を最善面に持ってくる

/* ----------------------------------------------------------------------------------------------
 * PhotoshopJSX-ConvertPNGtoAnimation
 * ----------
 * Author: Tsutomu Takanashi
 * Copyright (c) 2017 Tsutomu Takanashi
 * 
 * Project home:
 * 	https://github.com/t-nashi/PhotoshopJSX-ConvertPNGtoAnimation
 * 
 * This software is released under the MIT License:
 * 	https://opensource.org/licenses/mit-license.php
 * ---------------------------------------------------------------------------------------------- */

//-------------------------------------------------------------
// GENERAL SETTING
//-------------------------------------------------------------
//実行スクリプトファイルの情報取得
var _script			= $.fileName;								//スクリプトファイルのフルパス取得
var _root			= File($.fileName).parent + "/";			//スクリプトファイルまでのパス取得
var _scriptName		= File($.fileName).name;					//スクリプトファイル名取得
var _addFolder		= "resource/";

//読み込む対象のファイルを選定するための設定
var dir			= new Folder(_root+_addFolder);					//ファイル読み込み元のフォルダパス
var extention	= ".png";										//拡張子
var files		= dir.getFiles("*" + extention);				//指定拡張子のファイルを取得
var filecnt		= files.length;									//処理対象ファイル数の取得

//その他
var errorCount = 0;												//エラー回数をカウント

//※※ 処理実行トリガー ※※※
init();

//-------------------------------------------------------------
// INITIALIZE (CONSTRUCT)
//-------------------------------------------------------------
function init(){

	//読み込む対象のファイルがあるかどうか
	if(filecnt) {

		// 01. 対象ファイルをPhotoshop内へ読み込む
		//-----------------------------------------------------
		//指定形式のファイルを順に開き処理を行う
		for(var z=0; z<filecnt; z++){

			//ファイル名までのフルパス取得
			var nameOfFile = String(files[z].fullName);

			//ファイルオブジェクト定義
			var openObj = new File(nameOfFile);

			//ファイルオープン
			try{

				//最初とそれ以降の処理を分けるための分岐作り
				if(z==0){
					//【対象の複数ファイルの一番最初のファイルに対する処理）】

					//ベースとなるファイルを開く（ファイル名ソートで最初に来るファイル）
					(function(){app.open(openObj);})();
					//ベースとなるファイルを扱いやすいように変数に定義
					var _doc = app.activeDocument;
					//ドキュメントサイズを求める
					preferences.rulerUnits = Units.PIXELS;
					var docW = _doc.width.value;
					var docH = _doc.height.value;
					//新規ドキュメントを作成（ベースファイルと同じ width/height/dpi で作成）
					var res = _doc.resolution;

					//新規ドキュメントを作成
					documents.add(docW,docH,res);
					//新規ドキュメントを扱いやすいように変数に定義
					newDoc = app.activeDocument;

					//ベースファイルを保存せずに閉じる
					_doc.close(SaveOptions.DONOTSAVECHANGES);

					//新規ドキュメントにベースファイルを配置（スマートオブジェクトファイルとして）
					try{
						placeFile(openObj);
					}catch(e){
						continue;
					}
					//レイヤー名をファイル名と同じにする
					newDoc.activeLayer.name = files[z].name;

					//新規ドキュメント内の「背景」レイヤーを削除
					newDoc.layers[1].remove();
				}else{

					//【対象の複数ファイルの2番目以降のファイルの処理 （スマートオブジェクト化してアクティブドキュメントに配置）】
					try{
						placeFile(openObj);
					}catch(e){
						continue;
					}
					//レイヤー名の変更
					newDoc.activeLayer.name = files[z].name;

				}

			}catch(e){
				errorCount++;
			}

		}//for


		// 02. フレームアニメーションを作成する処理
		//-----------------------------------------------------

		//02-01. レイヤー数取得
		//alert("01. layerCount = "+newDoc.artLayers.length);

		//02-02. すべてのレイヤーを非表示
		visibleFalseParentLayers(newDoc);

		//02-03. フレームアニメーションを作成
		var idmakeFrameAnimation = stringIDToTypeID( "makeFrameAnimation" );
		executeAction( idmakeFrameAnimation, undefined, DialogModes.NO );
		// フレームを1秒に設定
		//=======================================================
		var idsetd = charIDToTypeID( "setd" );
			var desc2 = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
				var ref1 = new ActionReference();
				var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
				var idOrdn = charIDToTypeID( "Ordn" );
				var idTrgt = charIDToTypeID( "Trgt" );
				ref1.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
			desc2.putReference( idnull, ref1 );
			var idT = charIDToTypeID( "T   " );
				var desc3 = new ActionDescriptor();
				var idanimationFrameDelay = stringIDToTypeID( "animationFrameDelay" );
				desc3.putDouble( idanimationFrameDelay, 1.000000 );
			var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
			desc2.putObject( idT, idanimationFrameClass, desc3 );
		executeAction( idsetd, desc2, DialogModes.NO );

		//02-04. フレームをレイヤー数分作成
		var layCount = newDoc.artLayers.length;
		newDoc.layers[layCount-1].visible = true;
		for(var i=1; i<layCount; i++){
			// フレームを1つ追加
			//=======================================================
			var idDplc = charIDToTypeID( "Dplc" );
				var desc4 = new ActionDescriptor();
				var idnull = charIDToTypeID( "null" );
					var ref2 = new ActionReference();
					var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
					var idOrdn = charIDToTypeID( "Ordn" );
					var idTrgt = charIDToTypeID( "Trgt" );
					ref2.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
				desc4.putReference( idnull, ref2 );
			executeAction( idDplc, desc4, DialogModes.NO );
			if(i==1){newDoc.layers[layCount-1].visible = false;}
		}//for

		//02-05. 特定のフレームで特定のレイヤーを表示
		var j = 0;
		for(var i=layCount; 0<i; i--){
			// 指定のタイムラインに移動
			//=======================================================
			var idslct = charIDToTypeID( "slct" );
				var desc2 = new ActionDescriptor();
				var idnull = charIDToTypeID( "null" );
					var ref1 = new ActionReference();
					var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
					ref1.putIndex( idanimationFrameClass, i );
				desc2.putReference( idnull, ref1 );
			executeAction( idslct, desc2, DialogModes.NO );
			if((layCount-1)!=j){
				newDoc.layers[j].visible = true;
				j++;
			}
		}//for

		//02-06. リピート設定
		// リピート無限に設定
		//=======================================================
		var idsetd = charIDToTypeID( "setd" );
			var desc2 = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
				var ref1 = new ActionReference();
				var idanimationClass = stringIDToTypeID( "animationClass" );
				var idOrdn = charIDToTypeID( "Ordn" );
				var idTrgt = charIDToTypeID( "Trgt" );
				ref1.putEnumerated( idanimationClass, idOrdn, idTrgt );
			desc2.putReference( idnull, ref1 );
			var idT = charIDToTypeID( "T   " );
				var desc3 = new ActionDescriptor();
				var idanimationLoopEnum = stringIDToTypeID( "animationLoopEnum" );
				var idanimationLoopType = stringIDToTypeID( "animationLoopType" );
				var idanimationLoopForever = stringIDToTypeID( "animationLoopForever" );
				desc3.putEnumerated( idanimationLoopEnum, idanimationLoopType, idanimationLoopForever );
			var idanimationClass = stringIDToTypeID( "animationClass" );
			desc2.putObject( idT, idanimationClass, desc3 );
		executeAction( idsetd, desc2, DialogModes.NO );

		//02-08. psd保存
		//日時設定
		var days = ["sun","mon","tue","wed","thu","fri","sat"];
		var dObj = new Date();
		var y = dObj.getFullYear();
		var m = dObj.getMonth()+1;
		var d = dObj.getDate();
		var yb = dObj.getDay();
		var h = dObj.getHours();
		var mi = dObj.getMinutes();
		var s = dObj.getSeconds();
		var ms = dObj.getMilliseconds();
		//0付き二桁対応
		if(String(m).length==1) m="0"+m;
		if(String(d).length==1) d="0"+d;
		if(String(h).length==1) h="0"+h;
		if(String(mi).length==1) mi="0"+mi;
		if(String(s).length==1) s="0"+s;
		//ファイル名設定
		var saveFileName = y+""+m+""+d+""+days[yb]+"_"+h+""+mi+""+s;
		var fileObj = new File(_root + saveFileName + ".psd");
		//ファイルを別名保存
		saveAsFile(fileObj, newDoc);

		//02-07. gif書き出し
		gifExport2(saveFileName, 255);

		//02-09. 終了
		//ドキュメントを保存せずに閉じる
		newDoc.close(SaveOptions.DONOTSAVECHANGES);

		//処理が全て完了したら「finish!!!」と表示
		alert("finish!!!\n" + (filecnt-errorCount) + "/" + filecnt);

	}else{
		alert("読み込む対象のファイルがありません");
	}

}//init



//-------------------------------------------------------------
// Web用に保存する（GIF）--- Exif情報を含まない状態で書き出す
//-------------------------------------------------------------
function gifExport2(fileName, qualityVal) {
	var doc = app.activeDocument;														//アクティブドキュメントの定義
	doc.changeMode(ChangeMode.RGB);													//イメージのモードをRGBへ変更
	//doc.bitsPerChannel = BitsPerChannelType.EIGHT;								//カラーチャンネルを8bitにする。JPEGのmaxは24bit。8bit*RGBの3チャンネルで24bit
	var options = new ExportOptionsSaveForWeb();									//Web用に保存用の設定をする
	options.quality = qualityVal;													//画質（0～100 デフォルトは60 大きいほど高品質）
	options.format = SaveDocumentType.COMPUSERVEGIF;								//画像の形式 -> COMPUSERVEGIF, JPEG, PNG-8, PNG-24, BMP の指定が可能
	//options.optimized = false;													//最適化するか
	options.interlaced = false;														//インターレースにするか（プログレッシブJPGにするか）
	options.format = SaveDocumentType.COMPUSERVEGIF;								//GIF
	options.colorReduction = ColorReductionType.ADAPTIVE;							//パレット
	options.colors = qualityVal;													//色数

	var ext = '.gif'
	var saveName = new File(_root + fileName + ext);		//フォルダパスを含めたファイル名をセット

	doc.exportDocument(saveName, ExportType.SAVEFORWEB, options);
}//gifExport


//-------------------------------------------------------------
// 第一階層のレイヤーを全て非表示にする
//-------------------------------------------------------------
function visibleFalseParentLayers(doc){
	var j = 0;
	var ChildLyaers= doc.layers;
	for (var i = 0; i < ChildLyaers.length; i++){
		if (ChildLyaers[i].typename == "LayerSet"){
			j++;
		}
		j++;
		if(1 <= j && j < i){
			//
		}else{
			//レイヤーを非表示にする
			ChildLyaers[i].visible = false;
		}
	}
}


//-------------------------------------------------------------
// ファイルの別名保存（保存ファイルパス, ターゲットドキュメント）
//-------------------------------------------------------------
function saveAsFile(saveFile, targetDoc){
	var fileObj = new File(saveFile);
	//psdファイル保存の設定
	var psdOpt = new PhotoshopSaveOptions();
	psdOpt.alphaChannels = true;
	psdOpt.annotations = true;
	psdOpt.embedColorProfile = false;
	psdOpt.layers = true;
	psdOpt.spotColors = false;
	targetDoc.saveAs(fileObj, psdOpt, true, Extension.LOWERCASE);
}//saveAsFile


//-------------------------------------------------------------
// アクティブドキュメントにファイルを配置（file-->place... / Placing Files in Photoshop）
//-------------------------------------------------------------
function placeFile(filePath) {
	var desc18 = new ActionDescriptor();
	desc18.putPath( charIDToTypeID('null'), new File( filePath) );
	desc18.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );
		var desc19 = new ActionDescriptor();
		desc19.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );
		desc19.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );
	desc18.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc19 );
	executeAction( charIDToTypeID('Plc '), desc18, DialogModes.NO );
}
