/**
 * 
 */
google.charts.load('current', {
  packages: ['corechart', 'bar']
});
//google.charts.setOnLoadCallback(drawBasic);


const fr = document.fr;

// a,b,d,e 중 3개 값 넣어야 함
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


// e 최대값 표시 함수
function calcMaxE() {
  if(fr.C.value!="" && fr.B.value!="") {
    const B = fr.B.value;
    const C = fr.C.value;
    fr.maxE.value = "e 최대값 : " +Math.floor(((C-B)/B *100));
  }
}



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
let C = 0;
let D = 0;
let k = 0;
let kCost = 0;
let t = 0;

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
  C = Number(fr.C.value); // 최대 수강인원
  D = Number(fr.D.value); // 평균 출석일
  k = Number(fr.k.value); 

  
  // k일 이용시 가격 계산
  if(k <= I/4) {
    kCost = ((A/I)*(100+a+3*b)/100)*k;
  }else if(k <= I*2/4) {
    kCost = ((A/I)*(100+a+2*b)/100)*k;
  }else if(k <= I*3/4) {
    kCost = ((A/I)*(100+a+b)/100)*k;
  }else { 
    kCost = ((A/I)*(100+a)/100)*k;
  }
  fr.kCost.value=kCost; // k일 이용에 따른 금액

  // 금액이 수강료 넘어설 때 k값(=t) 구하기
  let t = 0;
  let kMaxCost = 0;
  while(kMaxCost<A) {
    t++;
    if(t <= I/4) {
      kMaxCost = ((A/I)*(100+a+3*b)/100)*t;
    }else if(t <= I*2/4) {
      kMaxCost = ((A/I)*(100+a+2*b)/100)*t;
    }else if(t <= I*3/4) {
      kMaxCost = ((A/I)*(100+a+b)/100)*t;
    }else { 
      kMaxCost = ((A/I)*(100+a)/100)*t;
    }
  }
  fr.t.value=t; // t일 화면에 표시


  // a,b,d,e 중 한 개 값 계산
  if (a == "") {
    a = Math.floor((I * 10000) / ((100 + d) * (100 + e)) - (E / 100 * (100 + 3 * b) / 100 * (I / 8 + 1 / 2) + F / 100 * (100 + 2 * b) / 100 * (3 * I / 8 + 1 / 2) + G / 100 * (100 + b) / 100 * (5 * I / 8 + 1 / 2) + H / 100 * (7 * I / 8 + 1 / 2))) * 80000 / (E * (I + 4) + F * (3 * I + 4) + G * (5 * H + 4) + H * (7 * I + 4));
    return "a";
  } else if (b == "") {
    b = Math.floor((I * 10000) / ((100 + d) * (100 + e)) - (E / 100 * (100 + a) / 100 * (I / 8 + 1 / 2) + F / 100 * (100 + a) / 100 * (3 * I / 8 + 1 / 2) + G / 100 * (100 + a) / 100 * (5 * I / 8 + 1 / 2) + H / 100 * (100 + a) / 100 * (7 * I / 8 + 1 / 2))) * 80000 / (E * 3 * (I + 4) + F * 2 * (3 * I + 4) + G * (5 * I + 4));
    return "b";
  } else if (d == "") {
    d = Math.floor((80000 / (E * (100 + a + 3 * b) * (I + 4) + F * (100 + a + 2 * b) * (3 * I + 4) + G * (100 + a + b) * (5 * I + 4) + H * (100 + a) * (7 * I + 4))) * I * 10000 / (100 + e)) - 100;
    return "d";
  } else if (e == "") {
    e = Math.floor((80000 / (E * (100 + a + 3 * b) * (I + 4) + F * (100 + a + 2 * b) * (3 * I + 4) + G * (100 + a + b) * (5 * I + 4) + H * (100 + a) * (7 * I + 4))) * I * 10000 / (100 + e)) - 100;
    return "e";
  }
} // calcABDE



let resultChange = []; // 변수(a,b,d,e 중 하나) 변화값
let expectSales = []; // 기대 매출 변화
// 차트 데이터 값 계산 - 변수의 변화에 따라 기대 매출 계산
function calcData(result) {
  calcMaxE(); // e최대값 출력

  let aRe = a;
  let bRe = b;
  let dRe = d;
  let eRe = e;

  let w1 = 0;
  let w2 = 0;
  let w3 = 0;
  let w4 = 0;
  let w1Cost = 0;
  let w2Cost = 0;
  let w3Cost = 0;
  let w4Cost = 0;


  // 변수(a,b,d,e 중 하나)에 따른 기대매출 변화
  for(let i =0; i < 5; i++) {
    w1 = Math.floor((B*(E/100)*((A/I)* (I/8 + 1/2) * ((100+aRe+3*bRe)/100))*((100+dRe)/100)*((100+eRe)/100))); // 1주차 가격
    w2 = Math.floor(B*(F/100)*((A/I)* ((3/8)*I + 1/2) * ((100+aRe+2*bRe)/100))*((100+dRe)/100)*((100+eRe)/100)); // 2주차 가격
    w3 = Math.floor(B*(G/100)*((A/I)* ((5/8)*I + 1/2) *((100+aRe+bRe)/100))*((100+dRe)/100)*((100+eRe)/100)); // 3주차 가격
    w4 = Math.floor(B*(H/100)*((A/I)* ((7/8)*I + 1/2) * (100+aRe)/100)*((100+dRe)/100)*((100+eRe)/100)); // 4주차 가격
    console.log(result+" - 수강료 대체  x  1,2,3,4주차 기대매출 : "+w1+", "+w2+", "+w3+", "+w4+" = 기대매출 합 "+(w1+w2+w3+w4));

    w1Cost = ((A/I)* (I/8 + 1/2) * ((100+aRe+3*bRe)/100))*((100+dRe)/100)*((100+eRe)/100);
    w2Cost =((A/I)* ((3/8)*I + 1/2) * ((100+aRe+2*bRe)/100))*((100+dRe)/100)*((100+eRe)/100);
    w3Cost = ((A/I)* ((5/8)*I + 1/2) *((100+aRe+bRe)/100))*((100+dRe)/100)*((100+eRe)/100);
    w4Cost = ((A/I)* ((7/8)*I + 1/2) * (100+aRe)/100)*((100+dRe)/100)*((100+eRe)/100);
    console.log("각 주차 가격 계산(여기서 A값 보다 크면 A로 계싼) - "+w1Cost+", " +w2Cost+", "+w3Cost+", "+w4Cost);

    
    // 각 주차 가격이 수강료(A) 보다 크면 수강료(A)로 계산
    if(w1Cost > A ) {w1Cost = A;}
    if(w2Cost > A ) {w2Cost = A;}
    if(w3Cost > A ) {w3Cost = A;}
    if(w4Cost > A ) {w4Cost = A;}
    
    w1 = Math.floor(B*(E/100) * w1Cost); // 1주차 가격
    w2 = Math.floor(B*(F/100) * w2Cost); // 2주차 가격
    w3 = Math.floor(B*(G/100) * w3Cost); // 3주차 가격
    w4 = Math.floor(B*(H/100) * w4Cost); // 4주차 가격
    // 합계 계산
    let total = w1 + w2 + w3 + w4;
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



// 차트 출력 함수
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



// 계산하기 버튼 클릭시 실행 - a,b,d,e의 변화에 따른 기대매출 출력
function drawBasic(event) {
  event.preventDefault();
  // a,b,d,e중 계산한 값
  const result = calcABDE();
  console.log("result : " + result);

  fr.sales.value = A * B; // 총매출 값 = 수강료*수강인원


  // a,b,d,e 중 3개 값 넣어야 그래프 출력됨
  if (check() == false) {
    return;
  }

  // a,b,d,e값 출력
  console.log("a : "+a);
  console.log("b : "+b);
  console.log("d : "+d);
  console.log("e : "+e);

  drawChart('a', 1);
  drawChart('b', 2);
  drawChart('d', 3);
  drawChart('e', 4);
}

fr.addEventListener('submit', drawBasic);
