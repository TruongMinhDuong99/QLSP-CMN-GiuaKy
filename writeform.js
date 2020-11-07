const { Console } = require('console');
const fs = require('fs');
function QuanLySanPham(res) {
    let data = fs.readFileSync('Views/QuanLySanPham.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
  function writeItemTable(obj, res) {
    res.write('<table class="table table-striped table-bordered table-list" border="1px solid black" style="margin-left:250px;width:80%;"><thead> <tr><th style="width:auto;">Mã SP</th> <th>Tên SP</th><th style="width:auto;">Số lượng</th><th style="width:auto;">Chọn</th></tr></thead> ');
    if (obj.err) {
      res.write(`<h5 style="color:red;">Error:: ${obj.err}</h5>`);
      res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
      if (obj.data.Items.length === 0) {
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
      }
      obj.data.Items.forEach((sp) => {
        res.write(`<tr>
        <td>${sp.MaSP}</td><td style="width : 200px">${sp.TenSP}</td>
        <td>${sp.SoLuong}</td>
        <td><input type="checkbox" /></td>`);
        res.write(`<td><a href="/delete?MaSP=${sp.MaSP}&TenSP=${sp.TenSP}">Delete</a></td>`);       
      });
    }
    res.write('</table>' );
    res.end();
  }
module.exports = {
  writeItemTable:writeItemTable,
  QuanLySanPham:QuanLySanPham
};