let province=require("./json/province.json");
let city=require("./json/city.json");
let country=require("./json/country.json");
//生成省市区三级
let end = [];
for (const provinceElement of province)
{
  let provLi = {label:provinceElement.name,value:provinceElement.id};
  // 检查下一lv
  let citiesInProv = city[provinceElement.id];
  for (const cityElement of citiesInProv)
  {
      let cityLi={label: cityElement.name,value : cityElement.id}
      if(provLi.children==null) provLi.children=[];
      provLi.children.push(cityLi);

      // 下级country
    let countriesInCity = country[cityElement.id];
    if (countriesInCity){
      for (const countryElement of countriesInCity)
      {
          let countryLi={label:countryElement.name,value : countryElement.id};
          if ( cityLi.children==null) cityLi.children = [];
          cityLi.children.push(countryLi);
      }
    }
  }


  end.push(provLi);
}



let fs = require('fs');
fs.writeFile("data.json",JSON.stringify(end),function (err) {
  if(err){
    console.log("writeFile/Err",err);
  }
});
