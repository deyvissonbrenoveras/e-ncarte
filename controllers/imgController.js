const fs = require("fs");
const compress_images = require("compress-images");
const path = require("path");
const TEMP_PATH = path.join(__dirname, "/../img/temp/");
const CLIENTE_LOGO_FOLDER = path.join(__dirname + "/../img/logos/");
const salvarImg = function (base64String, imgFolder, filePath){
    
    //Remova a primeira parte da string base64 para poder salvar o arquivo
    let img = base64String.replace("/^data:image\/\w+;base64,/", "");
    fs.writeFileSync(imgFolder + filePath, img, {encoding: "base64"}, error=>{
        if (error)
            console.log(error)
    }); 
    // console.log("teste")
    // let inputPath = TEMP_PATH + filePath;
    // let outputPath =  imgFolder + filePath;
    // console.log(inputPath);
    // console.log(outputPath);
    //compressao de imagem
    // compress_images(inputPath, outputPath, {compress_force: false, statistic: true, autoupdate: true}, false,
    //     {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
    //     {png: {engine: 'pngquant', command: ['--quality=20-50']}},
    //     {svg: {engine: 'svgo', command: '--multipass'}},
    //     {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic){
    //     console.log('-------------');
    //     console.log(error);
    //     console.log(completed);
    //     console.log(statistic);
    //     console.log('-------------'); 
    //     // fs.unlinkSync(inputPath);                           
    //     });   
    
}
const editarImg = function (img, pathAtual, novoPath, nomeUrlAtual){
    //Exclui a logo com o nome antigo
    console.log(CLIENTE_LOGO_FOLDER + pathAtual);
        if (fs.existsSync(CLIENTE_LOGO_FOLDER + pathAtual))
            fs.unlinkSync(CLIENTE_LOGO_FOLDER + pathAtual, err=>{
                console.log(err);
            });   
   
    //salva a logo já com o nome nome da url
    salvarImg(img.data, CLIENTE_LOGO_FOLDER, novoPath, function (err){
            if (err)
                return res.status(500).json({ message: "Houve um erro ao salvar a logo do cliente" });
        });       
    
}
const renomearImg = function(pathAtual, nomeUrlNovo){
    //Renomeia a logo para o novo nome de url
    let splitedLogoPath = pathAtual.split(".");
    let campanha = pathAtual.includes("-Campanha") ? "-Campanha" : "";
    let novoPath = nomeUrlNovo + campanha + "." + splitedLogoPath[splitedLogoPath.length - 1];
   fs.renameSync(CLIENTE_LOGO_FOLDER + pathAtual, CLIENTE_LOGO_FOLDER + novoPath, function (err){
       if (err)
           console.log(err)
   });
   return novoPath;
}
module.exports = {
    salvarImg,
    editarImg,
    renomearImg,
    CLIENTE_LOGO_FOLDER
}