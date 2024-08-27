/**
 * Gets the browser name or returns an empty string if unknown. 
 * This function also caches the result to provide for any 
 * future calls this function has.
 *
 * @returns {string}
 */
var browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return browser.prototype._cachedResult =
        isOpera ? 'opera' :
        isFirefox ? 'firefox' :
        isSafari ? 'safari' :
        isChrome ? 'chrome' :
        isIE ? 'ie' :
        isEdge ? 'edge' :
        isBlink ? 'blink' :
        "none";
};


function carregarSlides() {

    var width = $(window).width();
    var device = "";
    if (width < 668) { device = "mobile"; } else if (width < 992) { device = "tablet"; } else { device = "desktop"; }

    $("#carousel-main-website .hidden-" + device + ", .carousel .hidden-" + device).each(function() {
        $(this).remove();
    });

    var count = 0;
    $("#carousel-main-website .carousel-indicators li").each(function() {
        $(this).attr("data-slide-to", count);
        count++;
    });
    $(".img_slid").each(function() {
        var e = $(this).parents('.carousel-inner').children("*:nth-child(1)");
        if (e.index() == 0 && !e.hasClass("active")) {
            e.addClass("active")
        }
        if (typeof $(this).attr("data-src") != "undefined") {
            $(this).attr("src", $(this).attr("data-src"));
        } else if (typeof $(this).attr("data-style") != "undefined") {
            $(this).attr("style", $(this).attr("data-style"));
        }
    });
}

$(document).ready(function() {
    carregarSlides();
    $("body").addClass("navigator-" + browser());

    /*$('span.source-info').tooltip({ //balise.yourClass if you custom plugin
        effect: 'slide',
        trigger: "hover", //This is fine if you have links into tooltip
        html: true //Set false if you disable ckeditor textarea
    });*/

    $('.txt_pesquisa').keydown(function(e) {
        if (e.keyCode == 13) {
            if ($(this).val() != '')
                window.location.href = "index.html?pesquisa=" + $(this).val();
            e.preventDefault();
        }
    });
    $('.btn_categorias').click(function() {
        $('.menu_categorias').slideToggle();
    });
    $('#txtPesquisaProduto').off('keydown').on('keydown', function(event) {
        if ((event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode)) == 13) {
            event.preventDefault();
            if (!$(this).val() || $(this).val() == '')
                return;
            pesquisarProdutos(this);
        }
    });
    $('#txtPesquisaProduto2').off('keydown').on('keydown', function(event) {
        if ((event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode)) == 13) {
            event.preventDefault();
            if (!$(this).val() || $(this).val() == '')
                return;
            pesquisarProdutos(this);
        }
    });

    //Retirado pelo modelo 17
    //var $menu = $('.menu-collapse');
    //$('.collapse-menu').click(function () {
    //    if ($menu.hasClass('open')) {
    //        $menu.removeClass('open');
    //        $menu.slideUp();
    //    } else {
    //        $menu.addClass('open');
    //        $menu.slideDown();
    //    }
    //});
    $('.open-collapse-menu').click(function() {
        if ($('.collapse-menu').hasClass('open')) {
            $('.collapse-menu').animate({ right: "-300px" }, 500);
            $('.collapse-menu').removeClass('open');
        } else {
            $('.collapse-menu').addClass('open');
            $('.collapse-menu').animate({ right: "0px" }, 500);
        }

    });
    $(".close").click(function(event) {
        $(this).closest('.modal ').modal('hide');
    });
    makeInputMasks();
    if (window.Sys && Sys.WebForms && Sys.WebForms.PageRequestManager)
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
            $(".close").click(function(event) {
                $(this).closest('.modal ').modal('hide');
            });
            makeInputMasks();
        });
});

// Início do código de Aumentar/ Diminuir a letra
// Para usar coloque o comando: "javascript:mudaTamanho('tag_ou_id_alvo', -1);" para diminuir
// e o comando "javascript:mudaTamanho('tag_ou_id_alvo', +1);" para aumentar
var tagAlvo = new Array('p'); //pega todas as tags p//
// Especificando os possíveis tamanhos de fontes, poderia ser: x-small, small...
var tamanhos = new Array('9px', '10px', '11px', '12px', '13px', '14px', '15px');
var tamanhoInicial = 2;

function mudaTamanho(idAlvo, acao) {
    if (!document.getElementById) return
    var selecionados = null,
        tamanho = tamanhoInicial,
        i, j, tagsAlvo;
    tamanho += acao;
    if (tamanho < 0) tamanho = 0;
    if (tamanho > 6) tamanho = 6;
    tamanhoInicial = tamanho;
    if (!(selecionados = document.getElementById(idAlvo))) selecionados = document.getElementsByTagName(idAlvo)[0];

    selecionados.style.fontSize = tamanhos[tamanho];

    for (i = 0; i < tagAlvo.length; i++) {
        tagsAlvo = selecionados.getElementsByTagName(tagAlvo[i]);
        for (j = 0; j < tagsAlvo.length; j++) tagsAlvo[j].style.fontSize = tamanhos[tamanho];
    }
}

function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var dx = 0;
    var dy = 0;
    var bx = 0;
    var by = 0;
    var wx = 0;
    var wy = 0;
    if (document.documentElement) {
        dx = document.documentElement.scrollLeft || 0;
        dy = document.documentElement.scrollTop || 0;
    }

    if (document.body) {
        bx = document.body.scrollLeft || 0;
        by = document.body.scrollTop || 0;
    }
    var wx = window.scrollX || 0;
    var wy = window.scrollY || 0;
    var x = Math.max(wx, Math.max(bx, dx));
    var y = Math.max(wy, Math.max(by, dy));
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")"
        window.setTimeout(invokeFunction, time);
    }
}

function printDiv(id, pg) {
    var oPrint, oJan;
    oPrint = window.document.getElementById(id).innerHTML;
    oJan = window.open(pg);
    oJan.document.write(oPrint);
    oJan.window.print();
    oJan.document.close();
    oJan.focus();
}

function CarregarIFrame(id, src) {
    var frame = document.getElementById(id);
    frame.src = src;
}

///////////////////////////////////////////////////// Máscaras //////////////////////////////////////////////////

////////////////////////////////////////////////////// Exemplo de Utilização ///////////////////////////////////
/*
<input type="text" name="cep" onKeyPress="MascaraCep(form1.cep);"
maxlength="10" onBlur="ValidaCep(form1.cep)">
<br><br>DATA:
<input type="text" name="data" onKeyPress="MascaraData(form1.data);"
maxlength="10" onBlur= "ValidaDataform1.data);">
<br><br>Telefone: 
<input type="text" name="tel" onKeyPress="MascaraTelefone(form1.tel);" 
maxlength="14"  onBlur="ValidaTelefone(form1.tel);">
<br><br>CPF:
<input type="text" name="cpf" onBlur="ValidarCPF(form1.cpf);" 
onKeyPress="MascaraCPF(form1.cpf);" maxlength="14">
<br><br>CNPJ:
<input type="text" name="cnpj" onKeyPress="MascaraCNPJ(form1.cnpj);" 
maxlength="18" onBlur="ValidarCNPJ(form1.cnpj);">
*/

function MascaraCNPJ(cnpj) {
    if (mascaraInteiro(cnpj) == false) {
        event.returnValue = false;
    }
    return formataCampo(cnpj, '00.000.000/0000-00', event);
}

//adiciona mascara de cep
function MascaraCep(cep) {
    if (mascaraInteiro(cep) == false) {
        event.returnValue = false;
    }
    return formataCampo(cep, '00.000-000', event);
}

//adiciona mascara de data
function MascaraData(data) {
    if (mascaraInteiro(data) == false) {
        alert("teste");
        event.returnValue = false;
    }
    return formataCampo(data, '00/00/0000', event);
}

function MascaraHora(hora) {
    $(hora).focusout(function() { reformartarHora(this); });
    if (mascaraInteiro(hora) == false) {
        event.returnValue = false;
    }
    formataCampo(hora, '00:00:00', event);
}

function reformartarHora(hora) {
    if (hora.value.toString() != "") {
        var novoValor = "";

        while (hora.value.toString().length < 8)
            hora.value += hora.value.toString().length == 2 || hora.value.toString().length == 5 ? ":" : "0";

        var horaFormatada = hora.value.toString().substr(0, 8);
        for (i = 0; i < hora.value.split(':').length; i++) {
            if (horaFormatada.split(':')[i] != "") {
                var valor = eval(horaFormatada.split(':')[i]) > (i > 0 ? 59 : 23) ? (i > 0 ? "59" : "23") : horaFormatada.split(':')[i];
                novoValor += valor;
                novoValor += ":";
            }
        }
        hora.value = novoValor.substr(0, 8);
    } else
        hora.value = "00:00:00";

    //alert(hora.value.toString().length);

}

//adiciona mascara ao telefone
function MascaraTelefone(tel) {
    if (mascaraInteiro(tel) == false) {
        event.returnValue = false;
    }
    return formataCampo(tel, '(00) 0000-0000', event);
}

//adiciona mascara ao CPF
function MascaraCPF(cpf) {
    if (mascaraInteiro(cpf) == false) {
        event.returnValue = false;
    }
    return formataCampo(cpf, '000.000.000-00', event);
}

//////////////////////////////////////////////// Validações /////////////////////////////////////////////////////////////////
//valida telefone

function ValidaEMail(email) {
    var sEmail = $(email).val();
    var emailFilter = /^.+@.+\..{2,}$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/

    return emailFilter.test(sEmail) || sEmail.match(illegalChars);
}

function ValidaTelefone(tel) {
    exp = /\(\d{2}\)\ \d{4}\-\d{4}/
    if (!exp.test(tel.value))
        alert('Numero de Telefone Invalido!');
}

//valida CEP
function ValidaCep(cep) {
    exp = /\d{2}\.\d{3}\-\d{3}/
    if (!exp.test(cep.value))
        alert('Numero de Cep Invalido!');
}

//valida data
function ValidaData(data) {
    exp = /\d{2}\/\d{2}\/\d{4}/
    if (!exp.test(data.value))
        alert('Data Invalida!');
}

//valida o CPF digitado
function ValidarCPF(Objcpf) {
    var cpf = Objcpf.value;
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0,
        soma2 = 0;
    var vlr = 11;

    for (i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

    var digitoGerado = (soma1 * 10) + soma2;
    if (digitoGerado != digitoDigitado)
        alert('CPF Invalido!');
}

//valida numero inteiro com mascara
function mascaraInteiro() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
        return false;
    }
    return true;
}

//valida o CNPJ digitado
function ValidarCNPJ(ObjCnpj) {
    var cnpj = ObjCnpj.value;
    var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    var dig1 = new Number;
    var dig2 = new Number;

    exp = /\.|\-|\//g
    cnpj = cnpj.toString().replace(exp, "");
    var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));

    for (i = 0; i < valida.length; i++) {
        dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
        dig2 += cnpj.charAt(i) * valida[i];
    }
    dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
    dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

    if (((dig1 * 10) + dig2) != digito)
        alert('CNPJ Invalido!');

}

//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) {
    var boleanoMascara;

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)|\:| /g
    campoSoNumeros = campo.value.toString().replace(exp, "");

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.toString().length;

    if (Digitato != 8) { // backspace 
        for (i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) == "-") ||
                (Mascara.charAt(i) == ".") ||
                (Mascara.charAt(i) == ":") ||
                (Mascara.charAt(i) == "/"))
            boleanoMascara = boleanoMascara ||
                ((Mascara.charAt(i) == "(") ||
                    (Mascara.charAt(i) == ")") ||
                    (Mascara.charAt(i) == " "))
            if (boleanoMascara) {
                NovoValorCampo += Mascara.charAt(i);
                TamanhoMascara++;
            } else {
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        campo.value = NovoValorCampo;
    }
    if (campo.value.toString().length >= Mascara.length)
        campo.value = campo.value.toString().substr(0, Mascara.length - 1);
}

function marcarDesmarcarClientes(chk) {
    var checkar = $(chk).attr('checked') == "checked" ? true : false;
    for (var i = 0; i < document.getElementsByClassName('chkSelecionarCliente').length; i++) {
        document.getElementsByClassName('chkSelecionarCliente')[i].children[0].checked = checkar;
    }
}

function marcarDesmarcarGrid(chk, classeDoCheckDasLinhas) {
    var checkar = $(chk).attr('checked') == "checked" ? true : false;
    for (var i = 0; i < document.getElementsByClassName(classeDoCheckDasLinhas).length; i++) {
        document.getElementsByClassName(classeDoCheckDasLinhas)[i].children[0].checked = checkar;
    }
}

function Center(theItem) {
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var windowCenter = winWidth / 2;
    var itemCenter = $(theItem).width() / 2;
    var theCenter = windowCenter - itemCenter;
    var windowMiddle = winHeight / 2;
    var itemMiddle = $(theItem).height() / 2;
    var theMiddle = windowMiddle - itemMiddle;
    if (winWidth > $(theItem).width()) { //horizontal
        $(theItem).css('left', theCenter);
    } else {
        $(theItem).css('left', '0');
    }
    if (winHeight > $(theItem).height()) { //vertical
        $(theItem).css('top', theMiddle);
    } else {
        $(theItem).css('top', '0');
    }
}

var specialChars = [{ val: "a", let: "áàãâä" }, { val: "e", let: "éèêë" }, { val: "i", let: "íìîï" }, { val: "o", let: "óòõôö" }, { val: "u", let: "úùûü" }, { val: "c", let: "ç" },
    { val: "A", let: "ÁÀÃÂÄ" }, { val: "E", let: "ÉÈÊË" }, { val: "I", let: "ÍÌÎÏ" }, { val: "O", let: "ÓÒÕÔÖ" }, { val: "U", let: "ÚÙÛÜ" }, { val: "C", let: "Ç" },
    { val: "", let: "?!()" }, { val: "", let: "'\"" }
];

function replaceSpecialChars(str) {
    var $spaceSymbol = ' ';
    var regex;
    var returnString = str;
    for (var i = 0; i < specialChars.length; i++) {
        regex = new RegExp("[" + specialChars[i].let+"]", "g");
        returnString = returnString.replace(regex, specialChars[i].val);
        regex = null;
    }
    return returnString.replace('\'', '').replace('"', '').replace(/\s/g, $spaceSymbol);
}

function PagSeguro(idFormulario) {
    if (idFormulario != "") {
        $("#" + idFormulario).submit();
    }
}

//$(window).load(function () {
//    if ($('.zopim').length > 0 && $('.go_to_top').length > 0 &&
//        $('.zopim').css('right') == '10px' && eval($(document).scrollTop()) > 25) {
//        $zopim.livechat.button.setOffsetHorizontal(170);
//        $zopim.livechat.window.setOffsetHorizontal(170);
//    }
//});

function Pesquisar() {
    var palavra = ($('#tbxPesquisa').val() == "" ? "" : ($('#tbxPesquisa').val()));
    if (palavra && $.trim(palavra) != '') {
        window.location.href = "Pesquisa.aspx?pesquisa=" + palavra;
    } else {
        alert("Informe o que deseja pesquisar");
        return;
    }
}

$(document).scroll(function() {
    if (eval($(document).scrollTop()) > 25) {
        if ($('.zopim').length > 0) {
            $zopim.livechat.button.setOffsetHorizontal(170);
            $zopim.livechat.window.setOffsetHorizontal(170);
        }
        $('.go_to_top').show({ width: 'toggle' });
    } else {
        if ($('.zopim').length > 0) {
            $zopim.livechat.button.setOffsetHorizontal(10);
            $zopim.livechat.window.setOffsetHorizontal(10);
        }
        $('.go_to_top').hide({ width: 'toggle' });
    }
});

function goToTop() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
}

function pesquisarProdutos() {
    var pesquisa = $('#txtPesquisaProduto').val();
    window.location.href = 'Produtos.aspx?pesquisaProduto=' + pesquisa;
}

function pesquisarProdutos(campo) {
    var pesquisa = $(campo).val();
    window.location.href = 'Produtos.aspx?pesquisaProduto=' + pesquisa;
}

function showPopup(name) {
    $('#' + name).modal('show');
    setTimeout(function() {
        if ($('#' + name).find('.form-control').length > 0)
            $('#' + name).find('.form-control')[0].focus();
    }, 500);
}

function hidePopup(name) {
    $('#' + name).modal('hide');
}

function makeInputMasks() {
    try {
        mascaraTelefone();
        $('.input_cpf').unmask();
        $('.input_cnpj').unmask();
        $('.input_cep').unmask();
        $('.input_date').unmask();

        $('.input_cpf').mask('000.000.000-00', { reverse: true });
        $('.input_cnpj').mask('00.000.000/0000-00', { reverse: true });
        $(".input_cep").mask('00000-000', { reverse: true });
        $(".input_date").mask('00/00/0000', { reverse: true });

        $('.input_currency').unmaskMoney();
        $('.input_int').unmaskMoney();
        $('.input_percentage').unmaskMoney();
        $('.input_one_place').unmaskMoney();
        $('.input_weight').unmaskMoney();

        $('.input_currency').maskMoney({ thousands: '', decimal: ',', precision: 2 });
        $('.input_one_place').maskMoney({ thousands: '', decimal: ',', precision: 1 });
        $('.input_int').maskMoney({ thousands: '', precision: 0 });
        $('.input_percentage').maskMoney({ thousands: '', decimal: ',', precision: 1 });
        $('.input_weight').maskMoney({ thousands: '', decimal: ',', precision: 3 });
        $('.input_percentage').blur(function() {
            if (parseFloat($(this).val()) > 100)
                $(this).val('100.0');
        });

        $(".input_cpf_cnpj").each(function() {
            maskCpfCnpj(this);
        });

        $(".input_cpf_cnpj").keydown(function() {
            maskCpfCnpj(this);
        });

    } catch (ex) {
        console.log(ex);
    }
}

function mascaraTelefone() {
    $('.input_phone').each(function() {
        if ($(this).val().length > 14) {
            $(this).mask('(00) 00000-0000', {
                onKeyPress: function(phone, event, currentField, options) {
                    var new_sp_phone = phone.length > 13;
                    new_sp_phone ? $(currentField).mask('(00) 00000-0000', options) : $(currentField).mask('(00) 0000-0000?0', options);
                    $(currentField).val(phone.replace('?', ''));
                }
            });
        } else {
            $(this).mask('(00) 0000-0000?0', {
                onKeyPress: function(phone, event, currentField, options) {
                    var new_sp_phone = phone.length > 13;
                    new_sp_phone ? $(currentField).mask('(00) 00000-0000', options) : $(currentField).mask('(00) 0000-0000?0', options);
                    $(currentField).val(phone.replace('?', ''));
                }
            });
        }
    });
}

function maskCpfCnpj(campo) {
    try {
        $(campo).unmask();
        var tamanho = $(campo).val().length;
        if (tamanho < 11) {
            $(campo).mask("999.999.999-99");
        } else {
            $(campo).mask("99.999.999/9999-99");
        }
    } catch (ex) {
        console.log(ex);
    }
}

function isValidColor(value) {
    return /^(?:#(?:[A-Fa-f0-9]{3}){1,2}|(?:rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}|hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*|(?:rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}|hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,)\s*0*(?:\.\d+|1(?:\.0*)?)\s*)[)])/i.test(value);
}


// MANIPULAÇÃO DE COOKIES

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// FIM MANIPULAÇÃO DE COOKIES