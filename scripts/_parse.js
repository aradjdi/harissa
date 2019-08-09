const Q = require('q');
const xml2js = require('xml2js');

const parseXmlToJson = (xmlString) => {
    const deferred = Q.defer();

    const parser = new xml2js.Parser();
    parser.parseString(xmlString, (err, result) => {
        if (err) deferred.reject(err);
        else deferred.resolve(result);
    });

    return deferred.promise;
};

const parseJsonToXml = (jsonString) => {
    const xmlBuilder = new xml2js.Builder();
    return xmlBuilder.buildObject(jsonString);
};

module.exports = {
    parseXmlToJson,
    parseJsonToXml,
};
