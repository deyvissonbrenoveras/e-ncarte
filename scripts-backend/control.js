module.exports = {
     Produto: function(preco, descricao, imagemPath, emDestaque){
        this.preco = preco
        this.descricao = descricao
        this.formatMoney = function (places, symbol, thousand, decimal) {
            places = !isNaN(places = Math.abs(places)) ? places : 2;
            symbol = symbol !== undefined ? symbol : "$";
            thousand = thousand || ",";
            decimal = decimal || "."; 
                negative = this.preco < 0 ? "-" : "",
                i = parseInt(this.preco = Math.abs(+this.preco || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(this.preco - i).toFixed(places).slice(2) : "");
        }
        this.imagemPath = imagemPath
        this.emDestaque = emDestaque
        
    },
     Cliente: function(nome, nomeUrl, logoPath, produtos){
        this.nome = nome
        this.nomeUrl = nomeUrl
        this.logoPath = logoPath
        this.produtos = produtos
    }
}
