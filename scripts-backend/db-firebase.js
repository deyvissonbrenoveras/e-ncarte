var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDh837n7-gHUVraGW0d57_zhUEUsVQoTqM",
    authDomain: "e-ncarte.firebaseapp.com",
    databaseURL: "https://e-ncarte.firebaseio.com",
    projectId: "e-ncarte",
    storageBucket: "e-ncarte.appspot.com",
    messagingSenderId: "821717508689",
    appId: "1:821717508689:web:3321ccc91aaefd04ffce70",
    measurementId: "G-QMT11LCZ5M"
  };
  firebase.initializeApp(firebaseConfig);
  firestore = firebase.firestore()
  module.exports = {
      firebase,
      inserirCliente: function(cliente){
        return firestore.collection("Cliente").add(cliente)
      },
      listarClientes: function(callback){
        let fire = firestore.collection("Cliente").get()
        fire.then(snapshot=>{
          let clientes = []
          let cliente
          snapshot.forEach(doc=>{
            cliente = doc.data()
            cliente.id = doc.id
            clientes.push(cliente)
          })
          /
          callback(clientes)
        })        
      },
      editarCliente: function(cliente, idCliente){
          return firestore.collection("Cliente").doc(idCliente)
          .update(cliente)
      },
      excluirCliente: function(idCliente){
        return firestore.collection("Cliente").doc(idCliente).delete()
      },
      listarProdutosPorCliente: function(idCliente, callback){
        let fire = firestore.collection("Produto").where("idCliente", "==", idCliente).get()
        fire.then(snapshot=>{
          let produtos = []
          let produto
          snapshot.forEach(doc=>{
            produto = doc.data()
            produto.id = doc.id
            produtos.push(produto)
          })
          callback(produtos)
        })
      },
      inserirProduto: function(produto){
        return firestore.collection("Produto").add(produto)
      },
      excluirProdutosPorCliente: function(idCliente){
        return firestore.collection("Produto").where("idCliente", "==", idCliente).delete()
      }
      
  }