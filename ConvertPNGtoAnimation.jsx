#target photoshop
app.bringToFront();	//�A�v���P�[�V����(photoshop)���őP�ʂɎ����Ă���

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
//���s�X�N���v�g�t�@�C���̏��擾
var _script			= $.fileName;								//�X�N���v�g�t�@�C���̃t���p�X�擾
var _root			= File($.fileName).parent + "/";			//�X�N���v�g�t�@�C���܂ł̃p�X�擾
var _scriptName		= File($.fileName).name;					//�X�N���v�g�t�@�C�����擾
var _addFolder		= "resource/";

//�ǂݍ��ޑΏۂ̃t�@�C����I�肷�邽�߂̐ݒ�
var dir			= new Folder(_root+_addFolder);					//�t�@�C���ǂݍ��݌��̃t�H���_�p�X
var extention	= ".png";										//�g���q
var files		= dir.getFiles("*" + extention);				//�w��g���q�̃t�@�C�����擾
var filecnt		= files.length;									//�����Ώۃt�@�C�����̎擾

//���̑�
var errorCount = 0;												//�G���[�񐔂��J�E���g

//���� �������s�g���K�[ ������
init();

//-------------------------------------------------------------
// INITIALIZE (CONSTRUCT)
//-------------------------------------------------------------
function init(){

	//�ǂݍ��ޑΏۂ̃t�@�C�������邩�ǂ���
	if(filecnt) {

		// 01. �Ώۃt�@�C����Photoshop���֓ǂݍ���
		//-----------------------------------------------------
		//�w��`���̃t�@�C�������ɊJ���������s��
		for(var z=0; z<filecnt; z++){

			//�t�@�C�����܂ł̃t���p�X�擾
			var nameOfFile = String(files[z].fullName);

			//�t�@�C���I�u�W�F�N�g��`
			var openObj = new File(nameOfFile);

			//�t�@�C���I�[�v��
			try{

				//�ŏ��Ƃ���ȍ~�̏����𕪂��邽�߂̕�����
				if(z==0){
					//�y�Ώۂ̕����t�@�C���̈�ԍŏ��̃t�@�C���ɑ΂��鏈���j�z

					//�x�[�X�ƂȂ�t�@�C�����J���i�t�@�C�����\�[�g�ōŏ��ɗ���t�@�C���j
					(function(){app.open(openObj);})();
					//�x�[�X�ƂȂ�t�@�C���������₷���悤�ɕϐ��ɒ�`
					var _doc = app.activeDocument;
					//�h�L�������g�T�C�Y�����߂�
					preferences.rulerUnits = Units.PIXELS;
					var docW = _doc.width.value;
					var docH = _doc.height.value;
					//�V�K�h�L�������g���쐬�i�x�[�X�t�@�C���Ɠ��� width/height/dpi �ō쐬�j
					var res = _doc.resolution;

					//�V�K�h�L�������g���쐬
					documents.add(docW,docH,res);
					//�V�K�h�L�������g�������₷���悤�ɕϐ��ɒ�`
					newDoc = app.activeDocument;

					//�x�[�X�t�@�C����ۑ������ɕ���
					_doc.close(SaveOptions.DONOTSAVECHANGES);

					//�V�K�h�L�������g�Ƀx�[�X�t�@�C����z�u�i�X�}�[�g�I�u�W�F�N�g�t�@�C���Ƃ��āj
					try{
						placeFile(openObj);
					}catch(e){
						continue;
					}
					//���C���[�����t�@�C�����Ɠ����ɂ���
					newDoc.activeLayer.name = files[z].name;

					//�V�K�h�L�������g���́u�w�i�v���C���[���폜
					newDoc.layers[1].remove();
				}else{

					//�y�Ώۂ̕����t�@�C����2�Ԗڈȍ~�̃t�@�C���̏��� �i�X�}�[�g�I�u�W�F�N�g�����ăA�N�e�B�u�h�L�������g�ɔz�u�j�z
					try{
						placeFile(openObj);
					}catch(e){
						continue;
					}
					//���C���[���̕ύX
					newDoc.activeLayer.name = files[z].name;

				}

			}catch(e){
				errorCount++;
			}

		}//for


		// 02. �t���[���A�j���[�V�������쐬���鏈��
		//-----------------------------------------------------

		//02-01. ���C���[���擾
		//alert("01. layerCount = "+newDoc.artLayers.length);

		//02-02. ���ׂẴ��C���[���\��
		visibleFalseParentLayers(newDoc);

		//02-03. �t���[���A�j���[�V�������쐬
		var idmakeFrameAnimation = stringIDToTypeID( "makeFrameAnimation" );
		executeAction( idmakeFrameAnimation, undefined, DialogModes.NO );
		// �t���[����1�b�ɐݒ�
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

		//02-04. �t���[�������C���[�����쐬
		var layCount = newDoc.artLayers.length;
		newDoc.layers[layCount-1].visible = true;
		for(var i=1; i<layCount; i++){
			// �t���[����1�ǉ�
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

		//02-05. ����̃t���[���œ���̃��C���[��\��
		var j = 0;
		for(var i=layCount; 0<i; i--){
			// �w��̃^�C�����C���Ɉړ�
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

		//02-06. ���s�[�g�ݒ�
		// ���s�[�g�����ɐݒ�
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

		//02-08. psd�ۑ�
		//�����ݒ�
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
		//0�t���񌅑Ή�
		if(String(m).length==1) m="0"+m;
		if(String(d).length==1) d="0"+d;
		if(String(h).length==1) h="0"+h;
		if(String(mi).length==1) mi="0"+mi;
		if(String(s).length==1) s="0"+s;
		//�t�@�C�����ݒ�
		var saveFileName = y+""+m+""+d+""+days[yb]+"_"+h+""+mi+""+s;
		var fileObj = new File(_root + saveFileName + ".psd");
		//�t�@�C����ʖ��ۑ�
		saveAsFile(fileObj, newDoc);

		//02-07. gif�����o��
		gifExport2(saveFileName, 255);

		//02-09. �I��
		//�h�L�������g��ۑ������ɕ���
		newDoc.close(SaveOptions.DONOTSAVECHANGES);

		//�������S�Ċ���������ufinish!!!�v�ƕ\��
		alert("finish!!!\n" + (filecnt-errorCount) + "/" + filecnt);

	}else{
		alert("�ǂݍ��ޑΏۂ̃t�@�C��������܂���");
	}

}//init



//-------------------------------------------------------------
// Web�p�ɕۑ�����iGIF�j--- Exif�����܂܂Ȃ���Ԃŏ����o��
//-------------------------------------------------------------
function gifExport2(fileName, qualityVal) {
	var doc = app.activeDocument;														//�A�N�e�B�u�h�L�������g�̒�`
	doc.changeMode(ChangeMode.RGB);													//�C���[�W�̃��[�h��RGB�֕ύX
	//doc.bitsPerChannel = BitsPerChannelType.EIGHT;								//�J���[�`�����l����8bit�ɂ���BJPEG��max��24bit�B8bit*RGB��3�`�����l����24bit
	var options = new ExportOptionsSaveForWeb();									//Web�p�ɕۑ��p�̐ݒ������
	options.quality = qualityVal;													//�掿�i0�`100 �f�t�H���g��60 �傫���قǍ��i���j
	options.format = SaveDocumentType.COMPUSERVEGIF;								//�摜�̌`�� -> COMPUSERVEGIF, JPEG, PNG-8, PNG-24, BMP �̎w�肪�\
	//options.optimized = false;													//�œK�����邩
	options.interlaced = false;														//�C���^�[���[�X�ɂ��邩�i�v���O���b�V�uJPG�ɂ��邩�j
	options.format = SaveDocumentType.COMPUSERVEGIF;								//GIF
	options.colorReduction = ColorReductionType.ADAPTIVE;							//�p���b�g
	options.colors = qualityVal;													//�F��

	var ext = '.gif'
	var saveName = new File(_root + fileName + ext);		//�t�H���_�p�X���܂߂��t�@�C�������Z�b�g

	doc.exportDocument(saveName, ExportType.SAVEFORWEB, options);
}//gifExport


//-------------------------------------------------------------
// ���K�w�̃��C���[��S�Ĕ�\���ɂ���
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
			//���C���[���\���ɂ���
			ChildLyaers[i].visible = false;
		}
	}
}


//-------------------------------------------------------------
// �t�@�C���̕ʖ��ۑ��i�ۑ��t�@�C���p�X, �^�[�Q�b�g�h�L�������g�j
//-------------------------------------------------------------
function saveAsFile(saveFile, targetDoc){
	var fileObj = new File(saveFile);
	//psd�t�@�C���ۑ��̐ݒ�
	var psdOpt = new PhotoshopSaveOptions();
	psdOpt.alphaChannels = true;
	psdOpt.annotations = true;
	psdOpt.embedColorProfile = false;
	psdOpt.layers = true;
	psdOpt.spotColors = false;
	targetDoc.saveAs(fileObj, psdOpt, true, Extension.LOWERCASE);
}//saveAsFile


//-------------------------------------------------------------
// �A�N�e�B�u�h�L�������g�Ƀt�@�C����z�u�ifile-->place... / Placing Files in Photoshop�j
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
