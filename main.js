const form = document.querySelector('#myForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const birthday = new Date(document.querySelector('#birthday').value);
  const countries = Array.from(document.querySelectorAll('#countries option:checked')).map(option => option.value);

  const age = calculateAge(birthday);
  const months = calculateMonths(birthday);
  const table = createTable(countries);

  // 將結果插入到 HTML 頁面中
  const resultDiv = document.querySelector('#result');
  resultDiv.innerHTML = `<p>${name}的年齡是${age}歲${months}個月。</p>${table}`;
}

function calculateAge(birthday) {
  const now = new Date();
  const age = now.getFullYear() - birthday.getFullYear();
  if (now.getMonth() < birthday.getMonth() || (now.getMonth() === birthday.getMonth() && now.getDate() < birthday.getDate())) {
    return age - 1;
  }
  return age;
}

function calculateMonths(birthday) {
  const now = new Date();
  const months = (now.getFullYear() - birthday.getFullYear()) * 12 + now.getMonth() - birthday.getMonth();
  if (now.getDate() < birthday.getDate()) {
    return months - 1;
  }
  return months;
}

function createTable(countries) {
  const tableRows = countries.map(country => {
    // 從 JSON 文件中獲取國家相關信息
    const data = getCountryData(country);

    // 創建表格行
    return `
      <tr>
        <td>${data.name}</td>
        <td>${data.quota}</td>
        <td>${data.cost}</td>
      </tr>
    `;
  });

  // 創建表格
  return `
    <table>
      <thead>
        <tr>
          <th>國家</th>
          <th>名額</th>
          <th>費用</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows.join('')}
      </tbody>
    </table>
  `;
}

function getCountryData(country) {
  // 獲取 JSON 文件中國家相關信息
  const data = [
    {
      name: '美國',
      quota: 100,
      cost: 1000
    },
    {
      name: '英國',
      quota: 50,
      cost: 2000
    },
    {
      name: '日本',
      quota: 75,
      cost: 1500
    },
    // 其他國家的相關信息
  ];

  // 返回所選國家的相關信息
  return data.find(item => item.name === country);

        //當第一層選項選定，則該選項下的第二層全部被選定
        function allSelect(check_v, checkname) {
            var v_item = document.getElementsByName(check_v);
            var items = document.getElementsByName(checkname);
            for (var i = 0; i < items.length; ++i) {
                if (v_item[0].checked) {
                    items[i].checked = true;
                }
                else {
                    items[i].checked = false;
                }
            }
        }
        //當第二層選項全部被選定，則第一層被選定；若第二層選項至少有一個沒被選定，則第一層不被選定
        function singleSelect2parent(check_v, checkname) {
            var v_item = document.getElementsByName(check_v);
            var items = document.getElementsByName(checkname);
            var childStatus = true;
            for (var i = 0; i < items.length; ++i) {
                childStatus = (childStatus && items[i].checked);
            }
            if (childStatus) {
                v_item[0].checked = true;
            }
            else {
                v_item[0].checked = false;
            }
        }
        //全選按鈕，點選全選，則所有選項被選中
        function allChecked() {
            var inputItems = document.getElementsByClassName("checkbox2check");
            for (var i = 0; i < inputItems.length; i++) {
                var checkItems = document.getElementsByName("checkbox" + (i + 1));
                for (var j = 0; j < checkItems.length; j++) {
                    checkItems[j].checked = true;
                }
                inputItems[i].checked = true;
            }
        }
}