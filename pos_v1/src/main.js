function printInventory(Inventory){
    var allItems=loadAllItems();
    var Promotions=loadPromotions();
    var purchase_goods=Array();
    Statistical_goods(allItems,Inventory,purchase_goods);
    Arithmetical_discount(Promotions,purchase_goods);
    print_result(purchase_goods);
}

function Statistical_goods(allItems,Inventory,purchase_goods){
    for(var i=0;i<allItems.length;i++){
        var count=0,name='',unit='',price=0,barcode;
        for(var j=0;j<Inventory.length;j++){
            if(allItems[i].barcode==Inventory[j].slice(0,10)){
                name=allItems[i].name;
                unit=allItems[i].unit;
                price=allItems[i].price;
                barcode=allItems[i].barcode;
                if(Inventory[j].length>10){
                    count+=Number(Inventory[j].slice(11,12));
                }
                if(Inventory[j].length<=10){
                    count++;
                }
            }
        }
        if(name!=''){
            var length=purchase_goods.length;
            purchase_goods[length]=Array();
            purchase_goods[length]["name"]=name;
            purchase_goods[length]["count"]=count;
            purchase_goods[length]["barcode"]=barcode;
            purchase_goods[length]["unit"]=unit;
            purchase_goods[length]["price"]=price;
            purchase_goods[length]["discount"]=0;
        }
    }
}

function Judge_goods(item,one_inventory,purchase_goods){
    if(one_inventory.slice(0,10)==item.barcode){
        var length=purchase_goods.length;
        purchase_goods[length]=Array();
        purchase_goods[length]["name"]=item.name;
        purchase_goods[length]["unit"]=item.unit;
        purchase_goods[length]["price"]=item.price;
        purchase_goods[length]["barcode"]=item.barcode;
        if(one_inventory.length>10){
            return Number(one_inventory.slice(11,12));
        }
        if(one_inventory.length<=10){
            return 1;
        }
    }
    return 0;
}

function Arithmetical_discount(Promotions,purchase_goods){
    for(var i=0;i<Promotions.length;i++){
        if(Promotions[i]["type"]=="BUY_TWO_GET_ONE_FREE"){
            Judge_discount(Promotions[i],purchase_goods);
        }
    }
}

function Judge_discount(one_Promotions,purchase_goods){
    for(var i=0;i<one_Promotions["barcodes"].length;i++){
        for(var j=0;j<purchase_goods.length;j++){
            Calculate_discount(one_Promotions["barcodes"][i],purchase_goods[j]);
        }
    }
}

function Calculate_discount(Promotion_barcode,one_purchase){
    if(Promotion_barcode==one_purchase["barcode"]){
        one_purchase["discount"]=parseInt(one_purchase["count"]/3);
    }
}

function Calculate_sum_and_save(purchase_goods){
    var sum=0,save=0;
    for(var i=0;i<purchase_goods.length;i++){
        purchase_goods[i]["sum"]=(purchase_goods[i]["count"]-purchase_goods[i]["discount"])*purchase_goods[i]["price"];
        purchase_goods[i]["save"]=purchase_goods[i]["discount"]*purchase_goods[i]["price"];
        sum+=purchase_goods[i]["sum"];
        save+=purchase_goods[i]["save"];
    }
    return [sum,save];
}

function Tofixed_Two(purchase_goods){
    for(var i=0;i<purchase_goods.length;i++){
        purchase_goods[i]["price"]=purchase_goods[i]["price"].toFixed(2);
        purchase_goods[i]["sum"]=purchase_goods[i]["sum"].toFixed(2);
        purchase_goods[i]["save"]=purchase_goods[i]["save"].toFixed(2);
    }
}

function print_result(purchase_goods){
    var sum,save;
    var result=Calculate_sum_and_save(purchase_goods);
    Tofixed_Two(purchase_goods);
    sum=result[0];
    save=result[1];
    var output;
    output="***<没钱赚商店>购物清单***\n";
    for(var i=0;i<purchase_goods.length;i++){
        output=output+"名称："+purchase_goods[i].name+"，数量："+purchase_goods[i].count+purchase_goods[i].unit+"，单价："+purchase_goods[i].price+"(元)，小计："+purchase_goods[i]["sum"]+"(元)\n";
    }
    output+="----------------------\n";
    output+="挥泪赠送商品：\n";
    for(var i=0;i<purchase_goods.length;i++){
        if(purchase_goods[i]["discount"]!=0){
            output=output+"名称："+purchase_goods[i].name+"，数量："+purchase_goods[i]["discount"]+purchase_goods[i]["unit"]+"\n";
        }
    }
    output+="----------------------\n";
    output=output+"总计："+sum.toFixed(2)+"(元)\n";
    output=output+"节省："+save.toFixed(2)+"(元)\n";
    output+="**********************";
    console.log(output);
}
