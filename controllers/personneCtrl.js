const models = require("../models");
const Personnes = models.Personnes;

const globalLink = 'http://144.91.124.243:8080/api/'

module.exports = {
    create:  function(req, res){
        // Fonction de creation d'une personne
        let nom = req.params.nom
        let password = req.params.password
        let link = Math.random().toString(36).substring(2, 11)

        if(nom == null || password == null)
            return res.status(401).json({
                operation: "connection ou inscription",
                statut : "echec",
                cause: 'nom ou mot de passe absent'});

        Personnes.findOne({
            attributes: ['nom','password', 'link'],
            where : { nom : nom,
                      password : password}
        })
            .then(function(personne){
                if (!personne) {
                    var linktest = Personnes.findOne(
                        {attributes: ['link'], where: {link: link}})
                        .then(r  =>linktest = r)
                    while (linktest === link) {
                        link = Math.random().toString(36).substring(2, 11)
                        linktest = Personnes.findOne({attributes: ['link'], where: {link: link}})
                            .then(r  =>linktest = r);
                    }
                    Personnes.create({
                        nom: nom,
                        password: password,
                        link : link
                    })
                        .then(function (newPersonne) {
                            return res.status(200).json({
                                operation: "inscription",
                                statut : "succes",
                                link: globalLink +link});
                        })
                        .catch(function (err) {
                            return res.status(400).json({'error': "Erreur l'or de la creation"})
                        })
                } else {
                    return res.status(200).json({
                        operation: "Connection",
                        statut : "succes",
                        link: globalLink + personne.link});
                }
            })
            .catch(function(err,){
                return res.status(500).json({ 'error': err })
            })
    },
    link:  function(req, res){
        // Fonction de creation d'une personne
        let link = req.params.link
        if(link == null )
            return res.status(401).json({
                operation: "recherche du proprietaire du lien",
                statut : "echec",
                cause: 'lien absent '});

        Personnes.findOne({
            attributes: ['nom','password', 'link'],
            where : { link : link}
        })
            .then(function(personne){
                if (personne) {
                    return res.status(200).json({
                        operation: "recherche du proprietaire du lien",
                        statut : "succes",
                        nom: personne.nom});
                } else {
                    if(link.length != 9)
                        return res.status(201).json({
                            operation: "recherche du proprietaire du lien",
                            statut : "echec",
                            cause: 'lien invalide'});
                    return res.status(201).json({
                        operation: "recherche du proprietaire du lien",
                        statut : "echec",
                        cause: 'lien inexitant'});
                }
            })
            .catch(function(err,){
                return res.status(500).json({ 'error': err })
            })

    },


    parrain:  function(req, res){
        // Fonction de creation d'une personne
        let nom = req.params.nom
        let password = req.params.password
        let link = Math.random().toString(36).substring(2, 11)
        let link2 = req.params.link

        if(nom == null || password == null|| password == null)
            return res.status(401).json({
                operation: "connection ou inscription",
                statut : "echec",
                cause: 'nom ou mot de passe absent'});

        Personnes.findOne({
            attributes: ['nom','password', 'link'],
            where : { link : link2}
        })
            .then(function(personne2){
                if (personne2) {
                    Personnes.findOne({
                        attributes: ['nom','password', 'link'],
                        where : { nom : nom,
                            password : password}
                    })
                        .then(function(personne){
                            if (!personne) {
                                var linktest = Personnes.findOne(
                                    {attributes: ['link'], where: {link: link}})
                                    .then(r  =>linktest = r)
                                while (linktest === link) {
                                    link = Math.random().toString(36).substring(2, 11)
                                    linktest = Personnes.findOne({attributes: ['link'], where: {link: link}})
                                        .then(r  =>linktest = r);
                                }
                                Personnes.create({
                                    nom: nom,
                                    password: password,
                                    link : link
                                })
                                    .then(function (newPersonne) {

                                        return res.status(200).json({
                                            operation: "inscription",
                                            statut : "succes",
                                            proprietaire_lien_utiliser : personne2.nom,
                                            link: globalLink + link});


                                    })
                                    .catch(function (err) {
                                        return res.status(400).json({'error': "Erreur l'or de la creation"})
                                    })


                            } else {
                                return res.status(200).json({
                                    operation: "Connection",
                                    statut : "succes",
                                    proprietaire_lien_utiliser : personne2.nom,
                                    link: globalLink + personne.link});
                            }
                        })
                        .catch(function(err,){
                            return res.status(500).json({ 'error': err + '11' })
                        })
                }
                else {
                    if(link.length != 9)
                        return res.status(201).json({
                            operation: "connection / inscription",
                            statut : "echec",
                            cause: 'lien invalide'});
                    return res.status(201).json({
                        operation: "connection / inscription",
                        statut : "echec",
                        cause: 'lien inexitant'});
                }
            })
            .catch(function(err,){
                return res.status(500).json({ 'error': err + '11' })
            })


    },

}