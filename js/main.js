var productList = products;


window.print1 = function () {
    // console.log("1")
    // document.getElementById("print").style.display = "none";
    window.print();
}


// var productList = ["E-Stamp", "Notary", "Franking", "Company Compliance"];
var dl = ""

var div1 = document.createElement('div');

var dataList = function () {


    dl = '<datalist id="productList">'
    for (var i = 0; i < productList.length; i++) {
        dl += '<option>' + productList[i] + '</option>'
    }
    dl += '</datalist>'
    div1.innerHTML = dl;
}

dataList();


var update = function () {


    var invoiceDate = document.getElementById("invoiceDate");
    var invoiceNo = document.getElementById("invoiceNo");
    var custName = document.getElementById("custName");
    var custGSTIN = document.getElementById("custGSTIN");
    var shipAddress = document.getElementById("shipAddress");
    var billAddress = document.getElementById("billAddress");

    var IinvoiceDate = document.getElementById("IinvoiceDate");
    var IinvoiceNo = document.getElementById("IinvoiceNo");
    var IcustName = document.getElementById("IcustName");
    var IcustGSTIN = document.getElementById("IcustGSTIN");
    var IshipAddress = document.getElementById("IshipAddress");
    var IbillAddress = document.getElementById("IbillAddress");

    IinvoiceDate.innerText = invoiceDate.value;
    IinvoiceNo.innerText = invoiceNo.value;
    IcustName.innerText = custName.value;
    IcustGSTIN.innerText = custGSTIN.value;
    IshipAddress.innerText = shipAddress.value;
    IbillAddress.innerText = billAddress.value;

}


function addRow() {
    document.getElementById('form1').appendChild(div1);

    var table = document.getElementById("entryTable");
    var row = table.insertRow(table.row);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = '<input type="text" style="width:100%;" id="prod' + table.rows.length + '" placeholder="Product Name" list="productList" autocomplete="off">';
    cell2.innerHTML = '<input type="text" style="width:100%;" id="qty' + table.rows.length + '" placeholder="Quantity" autocomplete="off">';
    cell3.innerHTML = '<input type="text" style="width:100%;" id="rate' + table.rows.length + '" placeholder="Rate Per Item" autocomplete="off">';
    cell4.innerHTML = '<input type="text" style="width:100%;" id="discount' + table.rows.length + '" placeholder="Discount" autocomplete="off">';
}

function delRow() {
    var table = document.getElementById("entryTable");
    table.deleteRow(table.rows.length - 1);
}


function GenerateInvoice() {

    var gstin_true = true;
    if (document.getElementById("reversal").checked == false) {
        if(document.getElementById("custGSTIN").value.length > 0){
            gstin_true = true;
        }else{
            alert("Please enter a Valid Customer GSTIN.");
            gstin_true = false;
            return;
        }
    }

    if (gstin_true) {
        var table = document.getElementById("entryTable");
        var length = table.rows.length;
        var tablecontent = "";
        var subtotal = 0;
        var sub_taxable_value = 0;
        for (var i = 2; i <= length; i++) {
            var prod_name = document.getElementById("prod" + i).value;
            var qty = document.getElementById("qty" + i).value;
            var rate = document.getElementById("rate" + i).value;
            var discount = document.getElementById("discount" + i).value;
            var rate1 = rate;
            if (discount > 0) {
                rate1 = rate * ((100 - discount) / 100);
            }
            var state = document.getElementById("GSTstate").value;

            var taxable_value = qty * rate1;
            var taxable_value1 = Math.floor(taxable_value * 100) / 100;
            var cgst = 0;
            var sgst = 0;
            var igst = 0;
            var cgst1 = 0, igst1 = 0, sgst1 = 0;


            if (state == "karnataka") {
                igst = 0;
                cgst = Math.floor(taxable_value * 0.09 * 100) / 100;
                sgst = Math.floor(taxable_value * 0.09 * 100) / 100;
                cgst1 = cgst + "";
                sgst1 = sgst + "";
            } else {
                cgst = 0;
                sgst = 0;
                igst = Math.floor(taxable_value * 0.18 * 100) / 100;
                igst1 = igst + "";
            }

            var estamp = ["E-stamp", "E-Stamp" , "e-stamp" , "E-STAMP" , "estamp"];
            console.log(estamp, estamp.indexOf(prod_name.toLowerCase()));
            if(estamp.indexOf(prod_name) >= 0){
                cgst = 0;
                cgst1 = 0;
                igst = 0;
                igst1 = 0;
                sgst = 0;
                sgst1 = 0;
            }

            var govt_fee = "government fee";
            if(prod_name.toLowerCase().indexOf(govt_fee) >= 0){
                cgst = 0;
                cgst1 = 0;
                igst = 0;
                igst1 = 0;
                sgst = 0;
                sgst1 = 0;
            }

            var govt_fee1 = "government fees";
            if(prod_name.toLowerCase().indexOf(govt_fee1) >= 0){
                cgst = 0;
                cgst1 = 0;
                igst = 0;
                igst1 = 0;
                sgst = 0;
                sgst1 = 0;
            }

            var late_fee = "late filing fee";
            if(prod_name.toLowerCase().indexOf(late_fee) >= 0){
                cgst = 0;
                cgst1 = 0;
                igst = 0;
                igst1 = 0;
                sgst = 0;
                sgst1 = 0;
            }

            var late_fee1 = "late filing fees";
            if(prod_name.toLowerCase().indexOf(late_fee1) >= 0){
                cgst = 0;
                cgst1 = 0;
                igst = 0;
                igst1 = 0;
                sgst = 0;
                sgst1 = 0;
            }


            var total = Math.floor((taxable_value + cgst + sgst + igst) * 100) / 100;

            tablecontent += "<tr>";
            tablecontent += "<td colspan='3'>" + document.getElementById("prod" + i).value + "</td>";
            tablecontent += "<td>" + qty + "</td>";
            tablecontent += "<td>" + rate + "</td>";
            tablecontent += "<td>" + discount + "</td>";
            tablecontent += "<td>" + taxable_value1 + "</td>";
            tablecontent += "<td>" + cgst1 + "</td>";
            tablecontent += "<td>" + sgst1 + "</td>";
            tablecontent += "<td>" + igst1 + "</td>";
            tablecontent += "<td>" + total + "</td>";
            tablecontent += "</tr>";

            subtotal += total;
            sub_taxable_value += taxable_value;

        }

        tablecontent += "<tr>";
        tablecontent += "<td colspan='3'></td>";
        tablecontent += "<td></td>";
        tablecontent += "<td></td>";
        tablecontent += "<td></td>";
        tablecontent += "<td></td>";
        tablecontent += "<td></td>";
        tablecontent += "<td></td>";
        tablecontent += "<td></td>";
        tablecontent += "<td>" + Math.floor(subtotal * 100) / 100 + "</td>";
        tablecontent += "</tr>";


        document.getElementById("Itbody").innerHTML = tablecontent;

        var finalAmount = Math.round(subtotal);
        document.getElementById("taxableAmount").innerHTML = currency(Math.round(sub_taxable_value * 100) / 100);
        document.getElementById("totalTax").innerHTML = currency(Math.round((subtotal - sub_taxable_value) * 100) / 100);
        document.getElementById("roundOff").innerHTML = Math.round((Math.round(subtotal) - subtotal) * 100) / 100;
        document.getElementById("invoiceTotal").innerHTML = "&#8377;" + currency(finalAmount);
        document.getElementById("inWords").innerHTML = inWords(finalAmount);


        var unpaid = '<i class="fa fa-circle-o" style="margin-right:10px;"></i>';
        var paid = '<i class="fa fa-check-circle" style="margin-right:10px;"></i>';

        var mode = document.getElementById("paymentMode").value;

        var cash = document.getElementById("cash");
        var card = document.getElementById("card");
        var online = document.getElementById("online");
        var cheque = document.getElementById("cheque");

        if (mode == "cash") {
            cash.innerHTML = paid + "Cash";
            card.innerHTML = unpaid + "Card";
            online.innerHTML = unpaid + "Online Transfer";
            cheque.innerHTML = unpaid + "Cheque";
        } else if (mode == "card") {
            cash.innerHTML = unpaid + "Cash";
            card.innerHTML = paid + "Card";
            online.innerHTML = unpaid + "Online Transfer";
            cheque.innerHTML = unpaid + "Cheque";
        } else if (mode == "online") {
            cash.innerHTML = unpaid + "Cash";
            card.innerHTML = unpaid + "Card";
            online.innerHTML = paid + "Online Transfer";
            cheque.innerHTML = unpaid + "Cheque";
        } else {
            cash.innerHTML = unpaid + "Cash";
            card.innerHTML = unpaid + "Card";
            online.innerHTML = unpaid + "Online Transfer";
            cheque.innerHTML = paid + "Cheque";
        }
    }

}


var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only ' : '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function currency(x) {
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res

}