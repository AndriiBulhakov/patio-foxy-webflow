var currency_symbol = '$';
    var modifier_text_summary = true;

    var foxy_pattern=/^([^\{,]+)(\{((?:[pwcy][+:-][^\|\}]+\|?)+)\})?$/,modifier_pattern=/^p([+:-])([\d.]+)/;function convertSlugAsNeeded(a){return a.replace(/^\d/,function(a){return"\\"+a.charCodeAt(0).toString(16)+" "})}
    for(var slug in options){var target=document.querySelectorAll("form."+convertSlugAsNeeded(slug))[0];if(target)for(var key in options[slug])if(""!=options[slug][key]){var select=target.querySelectorAll("select."+convertSlugAsNeeded(key))[0];if(select)for(options_arr=options[slug][key].split(","),i=0;i<options_arr.length;i++){var curr=options_arr[i].trim(),option=curr.match(foxy_pattern),modifiers=[];option[1]=option[1].trim();var option_text="";option[3]&&(modifiers=option[3].split("|"));if(modifiers)for(var j=
    0;j<modifiers.length;j++){var price_modifier=modifiers[j].match(modifier_pattern);!price_modifier||"undefined"!==typeof modifier_text_summary&&!0!==modifier_text_summary||(option_text+=" (",option_text+=":"==price_modifier[1]?"":price_modifier[1],option_text+=currency_symbol+price_modifier[2],option_text+=")")}select.options[select.options.length]=new Option(option[1]+option_text,option[0])}}};
    var pricemod_regex=/[{\|]p([+\-:])([\d\.]+)(?:\D{3})?(?=[\|}])/,id_regex=/^(\d+):/,FC=FC||{};FC.onLoad=function(){FC.client.on("ready.done",initDynamicPrice)};
    function initDynamicPrice(){ADJUST={};$("input,select").off("change.foxy-dynamic-price");$('form[action*="'+FC.settings.storedomain+'"]').each(function(){var b=$(this),d="",g={products:{}};$(this).find("[name='name'],[name^='name||'],[name$=':name'],[name*=':name||']").each(function(){var k=getId(this.name),c=k?k+":":"",e=parseFloat(b.find("[name='"+c+"price'],[name^='"+c+"price||']").first().val());e={id:k,code:"",base_price:isNaN(e)?0:e,quantity:1,attributes:{},has_quantity:!1};var h=b.find("[name='"+
    c+"quantity'],[name^='"+c+"quantity||']");c=b.find("[name='"+c+"code'],[name^='"+c+"code||']");0<c.length&&(e.code=clearHash(c.first().val()),""===d&&(d=e.code));if(0<h.length){c=0;var l=getElementType(h);-1<["select","text"].indexOf(l)?(e.has_quantity=!0,c=parseFloat(clearHash(h.val()))):-1<["radio","checkbox"].indexOf(l)&&(e.has_quantity=!0,1==h.filter(":checked").length&&(c=parseFloat(clearHash(h.filter(":checked").val()))));isNaN(c)&&(c=0);e.quantity=c}g.products[k]=e});b.attr("data-fc-form-code")&&
    (d=b.attr("data-fc-form-code"));""!==d&&($(this).find("input,select").each(function(){var b=getId(this.name),c=getName(this.name),e=getElementType($(this));if("quantity"==c)$(this).data("fc-adjust-for",d).on("change.foxy-dynamic-price",function(){var c=0;if(-1<["select","text"].indexOf(e)||-1<["radio","checkbox"].indexOf(e)&&$(this).is(":checked"))c=parseFloat(clearHash(this.value));isNaN(c)&&(c=0);ADJUST[$(this).data("fc-adjust-for")].products[b].quantity=c;recalcTotal()});else if("price"==c&&"hidden"!=
    e)$(this).data("fc-adjust-for",d).on("change.foxy-dynamic-price",function(){var c=0;if(-1<["select","text"].indexOf(e)||-1<["radio","checkbox"].indexOf(e)&&$(this).is(":checked"))c=parseFloat(clearHash(this.value));isNaN(c)&&(c=0);ADJUST[$(this).data("fc-adjust-for")].products[b].base_price=c;recalcTotal()});else if("SELECT"==this.tagName){var h=!1;$(this).children("option").each(function(){-1<this.value.search(pricemod_regex)&&(h=!0)});h&&($(this).data("fc-adjust-for",d),g.products[b].attributes[clearHash(this.name)]=
    clearHash(this.value),$(this).on("change.foxy-dynamic-price",function(){ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)]=clearHash(this.value);recalcTotal()}))}else if(-1<this.value.search(pricemod_regex))switch($(this).data("fc-adjust-for",d),$(this).attr("type")){case "checkbox":$(this).is(":checked")?g.products[b].attributes[clearHash(this.name)]=clearHash(this.value):g.products[b].attributes[clearHash(this.name)]="";$(this).on("change.foxy-dynamic-price",function(){$(this).is(":checked")?
    ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)]=clearHash(this.value):ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)]="";recalcTotal()});break;case "radio":g.products[b].attributes.hasOwnProperty(clearHash(this.name))||(g.products[b].attributes[clearHash(this.name)]=""),$(this).is(":checked")&&(g.products[b].attributes[clearHash(this.name)]=clearHash(this.value)),$("[name='"+this.name+"']").data("fc-adjust-for",d).on("change.foxy-dynamic-price",
    function(){ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)]=clearHash(this.value);recalcTotal()})}}),ADJUST[d]=g)});recalcTotal()}function clearHash(b){return b.replace(/\|\|[\d\w]+(?:\|\|open)?$/,"")}function getNameParts(b){b=clearHash(b);return b.match(/(?:(\d+):)?(.*)/)}function getId(b){b=getNameParts(b);id_regex.test(this.name)&&(prefix=parseInt(this.name.match(id_regex)[0]));return void 0===b[1]?0:parseInt(b[1])}
    function getName(b){return getNameParts(b)[2]}function getElementType(b){if("SELECT"==b[0].tagName)return"select";if("INPUT"==b[0].tagName)switch(b.attr("type").toLowerCase()){case "text":case "number":case "tel":return"text";default:return b.attr("type").toLowerCase()}}
    function recalcTotal(){for(f in ADJUST){var b=0,d=0;for(p in ADJUST[f].products){var g=ADJUST[f].products[p].base_price,k=0;for(a in ADJUST[f].products[p].attributes){var c=ADJUST[f].products[p].attributes[a].match(pricemod_regex);if(c)switch(c[1]){case ":":g=parseFloat(c[2]);break;case "+":k+=parseFloat(c[2]);break;case "-":k-=parseFloat(c[2])}}g+=k;g*=ADJUST[f].products[p].quantity;b+=g;d+=ADJUST[f].products[p].quantity}"function"===typeof fcFormatPrice&&(b=fcFormatPrice(b,f));"function"===typeof fcFormatQuantity&&
    (d=fcFormatQuantity(d,f));b="object"==typeof FC&&FC.hasOwnProperty("json")&&FC.json.config.hasOwnProperty("currency_format")?jQuery.trim(FC.util.money_format(FC.json.config.currency_format,b)):b.formatMoney(2);$("."+f+"_total").html(b);$("."+f+"_total_quantity").html(d)}}
    Number.prototype.formatMoney=function(b,d,g){var k=this;b=isNaN(b=Math.abs(b))?2:b;d=void 0==d?".":d;g=void 0==g?",":g;var c=0>k?"-":"",e=parseInt(k=Math.abs(+k||0).toFixed(b))+"",h=3<(h=e.length)?h%3:0;return c+(h?e.substr(0,h)+g:"")+e.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+g)+(b?d+Math.abs(k-e).toFixed(b).slice(2):"")};

// Dynamic Price Calculation v3.2
var pricemod_regex=/[{\|]p([+\-:])([\d\.]+)(?:\D{3})?(?=[\|}])/,id_regex=/^(\d+):/,FC=FC||{};function initDynamicPrice(){ADJUST={},$("input,select").off("change.foxy-dynamic-price"),$('form[action*="'+FC.settings.storedomain+'"]').each((function(){var t=$(this),a="",e={products:{}};$(this).find("[name='name'],[name^='name||'],[name$=':name'],[name*=':name||']").each((function(){var r=getId(this.name),i=r?r+":":"",c=parseFloat(t.find("[name='"+i+"price'],[name^='"+i+"price||']").first().val()),s={id:r,code:"",base_price:isNaN(c)?0:c,quantity:1,attributes:{},has_quantity:!1},n=t.find("[name='"+i+"quantity'],[name^='"+i+"quantity||']"),o=t.find("[name='"+i+"code'],[name^='"+i+"code||']");if(o.length>0&&(s.code=clearHash(o.first().val()),""===a&&(a=s.code)),n.length>0){var h=0,d=getElementType(n);["select","text"].indexOf(d)>-1?(s.has_quantity=!0,h=parseFloat(clearHash(n.val()))):["radio","checkbox"].indexOf(d)>-1&&(s.has_quantity=!0,1==n.filter(":checked").length&&(h=parseFloat(clearHash(n.filter(":checked").val())))),isNaN(h)&&(h=0),s.quantity=h}e.products[r]=s}));t.attr("data-fc-form-code")&&(a=t.attr("data-fc-form-code")),""!==a&&($(this).find("input,select").each((function(){if(!this.disabled){var t=getId(this.name),r=getName(this.name),i=getElementType($(this));if("quantity"!=r)if("price"!=r||"hidden"==i){if("SELECT"==this.tagName){var c=!1;$(this).children("option").each((function(){this.value.search(pricemod_regex)>-1&&(c=!0)})),c&&($(this).data("fc-adjust-for",a),e.products[t].attributes[clearHash(this.name)]=clearHash(this.value),$(this).on("change.foxy-dynamic-price",(function(){ADJUST[$(this).data("fc-adjust-for")].products[t].attributes[clearHash(this.name)]=clearHash(this.value),recalcTotal()})))}else if(this.value.search(pricemod_regex)>-1)switch($(this).data("fc-adjust-for",a),$(this).attr("type")){case"checkbox":$(this).is(":checked")?e.products[t].attributes[clearHash(this.name)]=clearHash(this.value):e.products[t].attributes[clearHash(this.name)]="",$(this).on("change.foxy-dynamic-price",(function(){$(this).is(":checked")?ADJUST[$(this).data("fc-adjust-for")].products[t].attributes[clearHash(this.name)]=clearHash(this.value):ADJUST[$(this).data("fc-adjust-for")].products[t].attributes[clearHash(this.name)]="",recalcTotal()}));break;case"radio":e.products[t].attributes.hasOwnProperty(clearHash(this.name))||(e.products[t].attributes[clearHash(this.name)]=""),$(this).is(":checked")&&(e.products[t].attributes[clearHash(this.name)]=clearHash(this.value)),$("[name='"+this.name+"']").data("fc-adjust-for",a).on("change.foxy-dynamic-price",(function(){ADJUST[$(this).data("fc-adjust-for")].products[t].attributes[clearHash(this.name)]=clearHash(this.value),recalcTotal()}))}}else $(this).data("fc-adjust-for",a).on("change.foxy-dynamic-price",(function(){var a=0;(["select","text"].indexOf(i)>-1||["radio","checkbox"].indexOf(i)>-1&&$(this).is(":checked"))&&(a=parseFloat(clearHash(this.value))),isNaN(a)&&(a=0),ADJUST[$(this).data("fc-adjust-for")].products[t].base_price=a,recalcTotal()}));else $(this).data("fc-adjust-for",a).on("change.foxy-dynamic-price",(function(){var a=0;(["select","text"].indexOf(i)>-1||["radio","checkbox"].indexOf(i)>-1&&$(this).is(":checked"))&&(a=parseFloat(clearHash(this.value))),isNaN(a)&&(a=0),ADJUST[$(this).data("fc-adjust-for")].products[t].quantity=a,recalcTotal()}))}})),ADJUST[a]=e)})),recalcTotal()}function clearHash(t){return t.replace(/\|\|[\d\w]+(?:\|\|open)?$/,"")}function getNameParts(t){return(t=clearHash(t)).match(/(?:(\d+):)?(.*)/)}function getId(t){var a=getNameParts(t);return id_regex.test(this.name)&&(prefix=parseInt(this.name.match(id_regex)[0])),void 0===a[1]?0:parseInt(a[1])}function getName(t){return getNameParts(t)[2]}function getElementType(t){if("SELECT"==t[0].tagName)return"select";if("INPUT"==t[0].tagName)switch(t.attr("type").toLowerCase()){case"text":case"number":case"tel":return"text";default:return t.attr("type").toLowerCase()}}function recalcTotal(){for(f in ADJUST){var t=0,e=0;for(p in ADJUST[f].products){var r=ADJUST[f].products[p].base_price,i=0;for(a in ADJUST[f].products[p].attributes){var c=ADJUST[f].products[p].attributes[a].match(pricemod_regex);if(c)switch(c[1]){case":":r=parseFloat(c[2]);break;case"+":i+=parseFloat(c[2]);break;case"-":i-=parseFloat(c[2])}}r+=i,t+=r*=ADJUST[f].products[p].quantity,e+=ADJUST[f].products[p].quantity}"function"==typeof fcFormatPrice&&(t=fcFormatPrice(t,f)),"function"==typeof fcFormatQuantity&&(e=fcFormatQuantity(e,f));var s="object"==typeof FC&&FC.hasOwnProperty("json")&&FC.json.config.hasOwnProperty("currency_format")?jQuery.trim(FC.util.money_format(FC.json.config.currency_format,t)):t.formatMoney(2);$("."+f+"_total").html(s),$("."+f+"_total_quantity").html(e)}}FC.onLoad=function(){FC.client.on("ready.done",initDynamicPrice)},Number.prototype.formatMoney=function(t,a,e){var r=this,i=(t=isNaN(t=Math.abs(t))?2:t,a=null==a?".":a,e=null==e?",":e,r<0?"-":""),c=parseInt(r=Math.abs(+r||0).toFixed(t))+"",s=(s=c.length)>3?s%3:0;return i+(s?c.substr(0,s)+e:"")+c.substr(s).replace(/(\d{3})(?=\d)/g,"$1"+e)+(t?a+Math.abs(r-c).toFixed(t).slice(2):"")};
    
$(document).ready(function() {
        $(".w-condition-invisible").each(function() {
            $(this).remove();
        });
        $('input[name="quantity"]').val("1").attr("min", "1");
});