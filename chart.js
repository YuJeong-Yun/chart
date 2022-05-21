google.charts.load('current', {
  packages: ['corechart', 'bar']
});
//google.charts.setOnLoadCallback(drawBasic);
const fr = document.fr;



// a,b,d,e 중 3개 값 넣었는지 체크
function check() {
  if (fr.a.value != "" && fr.b.value != "" && fr.d.value != "" && fr.e.value == "") {
    return true;
  } else if (fr.a.value != "" && fr.b.value != "" && fr.d.value == "" && fr.e.value != "") {
    return true;
  } else if (fr.a.value != "" && fr.b.value == "" && fr.d.value != "" && fr.e.value != "") {
    return true;
  } else if (fr.a.value == "" && fr.b.value != "" && fr.d.value != "" && fr.e.value != "") {
    return true;
  } else {
    alert('a,b,d,e 중 3개의 값만 입력하세요.');
    return false;
  }
}


// // e 최대값 표시 함수
// function calcMaxE() {
//   if(fr.C.value!="" && fr.B.value!="") {
//     const B = fr.B.value;
//     const C = fr.C.value;
//     // e 최대값 = (c-B)/B * 100
//     fr.maxE.value = "e 최대값 : " +Math.floor(((C-B)/B *100));
//   }
// }



let a = 0;
let b = 0;
let d = 0;
let e = 0;
let E = 0;
let F = 0;
let G = 0;
let H = 0;
let A = 0;
let B = 0;
// let C = 0;
let D = 0;

// a,b,d,e 중 3개 값 받아서 나머지 하나 계산
function calcABDE() {
  a = Number(fr.a.value);
  b = Number(fr.b.value);
  d = Number(fr.d.value);
  e = Number(fr.e.value);
  I = Number(fr.I.value); // 총영업일
  E = Number(fr.week1.value);
  F = Number(fr.week2.value);
  G = Number(fr.week3.value);
  H = Number(fr.week4.value);
  A = Number(fr.A.value); // 수강료
  B = Number(fr.B.value); // 수강인원
  // C = Number(fr.C.value); // 최대 수강인원
  D = Number(fr.D.value); // 평균 출석일


  // a,b,d,e 중 한 개 값 계산
  // 4주차 부터 시작해서 각 주차 가격이 최대값 넘어서면 최대값으로 대체해 넣어서 a,b,d,e 값 다시 계산
  if (a == "") {
    a = Math.floor( ((I * 10000) / ((100 + d) * (100 + e)) - (E / 100 * (100 + 3 * b) / 100 * (I / 8 + 1 / 2) + F / 100 * (100 + 2 * b) / 100 * (3 * I / 8 + 1 / 2) + G / 100 * (100 + b) / 100 * (5 * I / 8 + 1 / 2) + H / 100 * (7 * I / 8 + 1 / 2))) * 80000 / (E * (I + 4) + F * (3 * I + 4) + G * (5 * H + 4) + H * (7 * I + 4)));
    console.log("원래 a : "+a);
    // 4주차 가격이 최대 가격보다 클 때
    if( B*(H/100)*((A/I)* ((7/8)*I + 1/2)) >= (A * B * (H/100)) ) {
      a = Math.floor(( (1-H/100)*100000000*I / ((100+d)*(100+e))-E* (I/8 + 1/2)*100-E* (I/8 + 1/2) *3*b-F* ((3/8)*I + 1/2) * 100-F* ((3/8)*I + 1/2)*2*b-G* ((5/8)*I + 1/2) *100-G* ((5/8)*I + 1/2)*b)/(E* (I/8 + 1/2)+F* ((3/8)*I + 1/2 )));
      console.log("4주차 대체 후 a : "+a);
      // 3주차 가격이 최대 가격보다 클 때
      if(B*(G/100)*((A/I)* ((5/8)*I + 1/2) *((100+a+b)/100)) >= A * B * (G/100) ) {
        a = Math.floor((((1-G/100-H/100)*100000000)*I/((100+d)*(100+e))-E* (I/8 + 1/2) * 100-E* (I/8 + 1/2) *3*b-F* ((3/8)*I + 1/2) * 100-F* ((3/8)*I + 1/2)*2*b)/(E* (I/8 + 1/2)+F* ((3/8)*I + 1/2)));
        console.log("3주차 대체 후 a : "+a);
        // 2주차 가격이 최대 가격보다 클 때
        if(B*(F/100)*((A/I)* ((3/8)*I + 1/2) * ((100+a+2*b)/100)) >= A * B* (F/100)) {
          a = Math.floor((1-F/100-G/100-H/100)*100000000/(E/I* (I/8 + 1/2)*(100+d)*(100+e))-100-3*b);
          console.log("2주차 대체 후 a : "+a);
        }
      }
    }
    return "a";

  } else if (b == "") {
    b = Math.floor( ((I * 10000) / ((100 + d) * (100 + e)) - (E / 100 * (100 + a) / 100 * (I / 8 + 1 / 2) + F / 100 * (100 + a) / 100 * (3 * I / 8 + 1 / 2) + G / 100 * (100 + a) / 100 * (5 * I / 8 + 1 / 2) + H / 100 * (100 + a) / 100 * (7 * I / 8 + 1 / 2))) * 80000 / (E * 3 * (I + 4) + F * 2 * (3 * I + 4) + G * (5 * I + 4)));
    console.log("원래 b : "+b);
    // 4주차 가격이 최대 가격보다 클 때
    if( (B*(H/100)*((A/I)* ((7/8)*I + 1/2) * (100+a)/100)) >= (A * B * (H/100)) ) {
      b = Math.floor((((1-H/100)*100000000*I/((100+d)*(100+e))-E* (I/8 + 1/2) * 100-E* (I/8 + 1/2) *a-F* ((3/8)*I + 1/2) * 100-F* ((3/8)*I + 1/2)*a-G* ((5/8)*I + 1/2) *100-G* ((5/8)*I + 1/2)*a)/(E* (I/8 + 1/2)*3+F* ((3/8)*I + 1/2)*2+G* ((5/8)*I + 1/2)))/3);
      console.log("4주차 대체 후 b : "+b);
      // 3주차 가격이 최대 가격보다 클 때
      if(B*(G/100)*((A/I)* ((5/8)*I + 1/2) *((100+a+b)/100)) >= A * B * (G/100) ) {
        b = Math.floor(((((1-G/100-H/100)*100000000)*I/((100+d)*(100+e))-E* (I/8 + 1/2) * 100-E* (I/8 + 1/2) *a-F* ((3/8)*I + 1/2) * 100-F* ((3/8)*I + 1/2)*a)/(E* (I/8 + 1/2) *3+F* ((3/8)*I + 1/2)*2))/2);
        console.log("3주차 대체 후 b : "+b);
        // 2주차 가격이 최대 가격보다 클 때
        if(B*(F/100)*((A/I)* ((3/8)*I + 1/2) * ((100+a+2*b)/100)) >= A * B* (F/100)) {
          b = Math.floor(((1-F/100-G/100-H/100)*100000000/(E/I* (I/8 + 1/2)*(100+d)*(100+e))-100-a)/3);
          console.log("2주차 대체 후 b : "+b);
        }
      }
    }
    return "b";

  } else if (d == "") {
    d = Math.floor((80000 / (E * (100 + a + 3 * b) * (I + 4) + F * (100 + a + 2 * b) * (3 * I + 4) + G * (100 + a + b) * (5 * I + 4) + H * (100 + a) * (7 * I + 4))) * I * 10000 / (100 + e)) - 100;
    console.log("원래 d : "+d);
    // 4주차 가격이 최대 가격보다 클 때
    if( (B*(H/100)*((A/I)* ((7/8)*I + 1/2) * (100+a)/100)) >= (A * B * (H/100)) ) {
      d = Math.floor( ((1-H/100)*100000000)/(E/I* (I/8 + 1/2) * (100+a+3*b)*(100+e)+F/I* ((3/8)*I + 1/2) * (100+a+2*b)*(100+e)+G/I* ((5/8)*I + 1/2) *(100+a+b)*(100+e))-100 );
      console.log("4주차 대체 후 d : "+d);
      // 3주차 가격이 최대 가격보다 클 때
      if( B*(G/100)*((A/I)* ((5/8)*I + 1/2) *((100+a+b)/100)) >= A * B * (G/100) ) {
        d = Math.floor( (1-G/100-H/100)*100000000/(E/I* (I/8 + 1/2) * (100+a+3*b)*(100+e)+F/I* ((3/8)*I + 1/2) * (100+a+2*b)*(100+e))-100 );
        console.log("3주차 대체 후 d : "+d);
        // 2주차 가격이 최대 가격보다 클 때
        if( B*(F/100)*((A/I)* ((3/8)*I + 1/2) * ((100+a+2*b)/100)) >= A * B* (F/100) ) {
          d = Math.floor( (1-F/100-G/100-H/100)*100000000/(E/I* (I/8 + 1/2) * ((100+a+3*b))*(100+e))-100 );
          console.log("2주차 대체 후 d : "+d);
        }
      }
    }
    return "d";

  } else if (e == "") {
    e = Math.floor((80000 / (E * (100 + a + 3 * b) * (I + 4) + F * (100 + a + 2 * b) * (3 * I + 4) + G * (100 + a + b) * (5 * I + 4) + H * (100 + a) * (7 * I + 4))) * I * 10000 / (100 + e)) - 100;
    console.log("원래 e : "+e);
    // 4주차 가격이 최대 가격보다 클 때
    if( (B*(H/100)*((A/I)* ((7/8)*I + 1/2) * (100+a)/100)) >= (A * B * (H/100)) ) {
      e = Math.floor( ((1-H/100)*100000000)/(E/I* (I/8 + 1/2) * (100+a+3*b)*(100+d)+F/I* ((3/8)*I + 1/2) * (100+a+2*b)*(100+d)+G/I* ((5/8)*I + 1/2) *(100+a+b)*(100+d))-100 );
      console.log("4주차 대체 후 e : "+e);
      // 3주차 가격이 최대 가격보다 클 때
      if( B*(G/100)*((A/I)* ((5/8)*I + 1/2) *((100+a+b)/100)) >= A * B * (G/100) ) {
        e = Math.floor( (1-G/100-H/100)*100000000/(E/I* (I/8 + 1/2) * (100+a+3*b)*(100+d)+F/I* ((3/8)*I + 1/2) * (100+a+2*b)*(100+d))-100 );
        console.log("3주차 대체 후 e : "+e);
        // 2주차 가격이 최대 가격보다 클 때
        if( B*(F/100)*((A/I)* ((3/8)*I + 1/2) * ((100+a+2*b)/100)) >= A * B* (F/100) ) {
          e = Math.floor( (1-F/100-G/100-H/100)*100000000/(E/I* (I/8 + 1/2) * ((100+a+3*b))*(100+d))-100 );
          console.log("2주차 대체 후 e : "+e);
        }
      }
    }
    return "e";
  }
} // calcABDE







//////////////////////////////////////////////// 차트 함수 //////////////////////////////////////////////////
let resultChange = []; // 변수(a,b,d,e 중 하나) 변화값 담을 배열
let expectSales = []; // 기대 매출 변화값 담을 배열

// 차트 데이터 값 계산 - 변수의 변화에 따라 기대 매출 계산
function calcData(result) {
  // calcMaxE(); // e최대값 출력

  let aRe = a;
  let bRe = b;
  let dRe = d;
  let eRe = e;

  let w1 = 0;
  let w2 = 0;
  let w3 = 0;
  let w4 = 0;
  // let w1Cost = 0;
  // let w2Cost = 0;
  // let w3Cost = 0;
  // let w4Cost = 0;


  // 변수(a,b,d,e 중 하나)에 따른 기대매출 변화
  for(let i =0; i < 5; i++) {
    w1 = Math.floor((B*(E/100)*((A/I)* (I/8 + 1/2) * ((100+aRe+3*bRe)/100))*((100+dRe)/100)*((100+eRe)/100))); // 1주차 가격
    w2 = Math.floor(B*(F/100)*((A/I)* ((3/8)*I + 1/2) * ((100+aRe+2*bRe)/100))*((100+dRe)/100)*((100+eRe)/100)); // 2주차 가격
    w3 = Math.floor(B*(G/100)*((A/I)* ((5/8)*I + 1/2) *((100+aRe+bRe)/100))*((100+dRe)/100)*((100+eRe)/100)); // 3주차 가격
    w4 = Math.floor(B*(H/100)*((A/I)* ((7/8)*I + 1/2) * (100+aRe)/100)*((100+dRe)/100)*((100+eRe)/100)); // 4주차 가격
    // console.log(result+" - 수강료 대체  안한 원래  1,2,3,4주차 기대매출 : "+w1+", "+w2+", "+w3+", "+w4+" = 기대매출 합 "+(w1+w2+w3+w4));

    // // 여기서 수강료 A 보다 크게 나오면 A 로 대체해서 계산
    // w1Cost = ((A/I)* (I/8 + 1/2) * ((100+aRe+3*bRe)/100))*((100+dRe)/100)*((100+eRe)/100);
    // w2Cost =((A/I)* ((3/8)*I + 1/2) * ((100+aRe+2*bRe)/100))*((100+dRe)/100)*((100+eRe)/100);
    // w3Cost = ((A/I)* ((5/8)*I + 1/2) *((100+aRe+bRe)/100))*((100+dRe)/100)*((100+eRe)/100);
    // w4Cost = ((A/I)* ((7/8)*I + 1/2) * (100+aRe)/100)*((100+dRe)/100)*((100+eRe)/100);
    // console.log("각 주차 가격 계산(여기서 A값 보다 크면 A로 계싼) - "+w1Cost+", " +w2Cost+", "+w3Cost+", "+w4Cost);

    
    // // 각 주차 가격이 수강료(A) 보다 크면 수강료(A)로 계산
    // if(w1Cost > A ) {w1Cost = A;}
    // if(w2Cost > A ) {w2Cost = A;}
    // if(w3Cost > A ) {w3Cost = A;}
    // if(w4Cost > A ) {w4Cost = A;}
    
    // w1 = Math.floor(B*(E/100) * w1Cost); // 1주차 가격
    // w2 = Math.floor(B*(F/100) * w2Cost); // 2주차 가격
    // w3 = Math.floor(B*(G/100) * w3Cost); // 3주차 가격
    // w4 = Math.floor(B*(H/100) * w4Cost); // 4주차 가격
    // 기대 매출 합계 계산
    let total = w1 + w2 + w3 + w4;
    if(total < 7000000) {
      total = 7000000;
    }
    expectSales.push(Math.floor(total));
    
    // 변수(a,b,d,e) 5씩 증가함에 따라 기대매출 변화 계산
    if(result == "a") {
      resultChange.push(aRe);
      aRe += 5;
    }else if(result == "b") {
      resultChange.push(bRe);
      bRe += 5;
    }else if(result == "d") {
      resultChange.push(dRe);
      dRe += 5;
    }else { // result == "e"
      resultChange.push(eRe);
      eRe += 5;
    }
  }
} // calcData


// a,b,d,e에 따른 기대매출 차트 출력 함수
function drawChart(dataABDE, seq) {
  // 차트 데이터 계산
  calcData(dataABDE);

  // 차트 데이터
  var data = google.visualization.arrayToDataTable([
    [dataABDE, '기대 매출'],
    [resultChange[0], expectSales[0]],
    [resultChange[1], expectSales[1]],
    [resultChange[2], expectSales[2]],
    [resultChange[3], expectSales[3]],
    [resultChange[4], expectSales[4]],
  ]);

  var options = {
    title: dataABDE+'에 따른 기대 매출 변화',
    hAxis: {
      title: dataABDE + '의 값'
    }
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'+seq));

  chart.draw(data, options);

  // 배열 초기화
  resultChange=[];
  expectSales=[];
} // drawChart




let kCostArr = [];
let t = [];
// k일 이용에 따른 금액 계산
function calcK() {
  // 금액이 수강료 넘어설 때 k값 구하기
  let k = 0; // 이용일 담을 변수
  let maxCost = 0; // k일 이용시 가격

  // k일 이용에 따른 금액 계산
  while(k<28) {
    k++;
    if(k <= I/4) {
      maxCost = ((A/I)*(100+a+3*b)/100)*k;
    }else if(k <= I*2/4) {
      maxCost = ((A/I)*(100+a+2*b)/100)*k;
    }else if(k <= I*3/4) {
      maxCost = ((A/I)*(100+a+b)/100)*k;
    }else { 
      maxCost = ((A/I)*(100+a)/100)*k;
    }
    // 금액이 수강료 넘어서면 수강료로 대체
    if(maxCost>A) {
      maxCost=A;
      t.push(k);
    }
    kCostArr.push(maxCost);
  }
} //calcK

// k일 이용에 따른 금액 차트 출력 함수
function drawChartK(seq) {
  // 차트 데이터 계산
  calcK();

  // 차트 데이터
  var data = google.visualization.arrayToDataTable([
    ['k일 이용', '금액'],
      [1, kCostArr[0]], [2, kCostArr[1]], [3, kCostArr[2]],
      [4, kCostArr[3]], [5, kCostArr[4]], [6, kCostArr[5]],
      [7, kCostArr[6]], [8, kCostArr[7]], [9, kCostArr[8]],
      [10, kCostArr[9]], [11, kCostArr[10]], [12, kCostArr[11]],
      [13, kCostArr[12]], [14, kCostArr[13]], [15, kCostArr[14]],
      [16, kCostArr[15]], [17, kCostArr[16]], [18, kCostArr[17]],
      [19, kCostArr[18]], [20, kCostArr[19]], [21, kCostArr[20]],
      [22, kCostArr[21]], [23, kCostArr[22]], [24, kCostArr[23]],
      [25, kCostArr[24]], [26, kCostArr[25]], [27, kCostArr[26]],
      [28, kCostArr[27]],
  ]);

  var options = {
    title: 'k일 이용에 따른 금액 변화',
    hAxis: {
      title: 'k의 값'
    },
    colors: ['#e6693e']
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'+seq));

  chart.draw(data, options);

  // 배열 초기화
  kCostArr = [];
} // drawChartK



/////////////////////////////////// 계산하기 버튼 클릭시 실행 - a,b,d,e의 변화에 따른 기대매출 출력//////////////////////////////
function drawBasic(event) {
  event.preventDefault();
  // a,b,d,e중 계산한 변수 가져오기
  const result = calcABDE();
  console.log("result : " + result);

  fr.sales.value = A * B; // 총매출 값 = 수강료*수강인원 출력


  // a,b,d,e 중 3개 값 넣어야 그래프 출력됨
  if (check() == false) {
    return;
  }

  // a,b,d,e값에 따른 기대 매출 그래프 출력
  console.log("a : "+a);
  console.log("b : "+b);
  console.log("d : "+d);
  console.log("e : "+e);

  drawChart('a', 1);
  drawChart('b', 2);
  drawChart('d', 3);
  drawChart('e', 4);
  drawChartK(5);

  document.querySelector('#kResult').innerHTML = "=> "+t[0]+"일 이상부터 수강료와 같아짐";

  // k일 이용에 따른 금액 그래프 출력
}

fr.addEventListener('submit', drawBasic);
