$(document).ready(function () {
  $(".erro").hide();
  $(".sucesso").hide();
  $("#tree").hide();

  $("#ir").on('click', manageEntradaAnalisar);
  $("#gerarImg").on('click', manageEntradaGerarImg);

  $("#entrada").on('keypress', function (e) {
    if (e.which == 13) {//pressionou enter
      manageEntradaAnalisar()
    }
  })


  function manageEntradaAnalisar() {
    var entrada = $("#entrada").val();
    if (entrada) {
      console.log(analisador.verificaSentenca(entrada));
      var result = analisador.verificaSentenca(entrada);

      if (result.status === "ok") {
        printSucesso(result.msg)
      } else {
        printErro(result.msg)
      }
    } else {
      printErro("Entrada não pode ser vazia!")
    }
  }

  function manageEntradaGerarImg() {
    var entrada = $("#entrada").val();
    if (entrada) {
      var verificacao = analisador.verificaSentenca(entrada);
      if(verificacao.status === "ok"){
        var res = analisador.getChildrenAsJSON(entrada)
        var simple_chart_config = {
          chart: {
            container: "#tree"
          },
  
          nodeStructure:
            res
        };
        $("#tree").show()
  
        var my_chart = new Treant(simple_chart_config);
        var chart = new Treant(simple_chart_config, function () { printSucesso('Árvore gerada!') }, $);
      }else{
        printErro(verificacao.msg)  
      }

    } else {
      printErro("Entrada não pode ser vazia!")
    }
  }

  function printErro(erro) {


    $(".erro").show();
    $("#msgErro").html(erro);
    $("#msgErro").fadeTo(2000, 500).slideUp(500, function () {
      $("#msgErro").slideUp(500);
      $(".erro").hide();
    });
  }
  function printSucesso(sucesso) {
    $(".sucesso").show();
    $("#msgSucesso").html(sucesso);
    $("#msgSucesso").fadeTo(2000, 500).slideUp(500, function () {
      $("#msgSucesso").slideUp(500);
      $(".sucesso").hide();
    });
  }

  $("#random").on('click', randomToken);

  function randomToken(){

    /* $.getJSON('tokens.json', function(dados) {
        var items = [];
        $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
      });
        console.log(items);
      });
 */
    var tokens = [ "1 + 1", "3", "x","( 54 )", "( / )", "( 2 / 9 )", " / )"];
    var random = 0;
    var token = "";

    for (var i = 0; i < tokens.length; i++) {
        var rNum = Math.floor(Math.random() * tokens.length);
        random = rNum  
    }

    token = tokens[random];
    console.log(token);
    document.getElementById('entrada').value = token;
    return token;
  }

});
