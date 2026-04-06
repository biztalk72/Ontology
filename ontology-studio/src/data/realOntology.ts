import type { OntologyNode, OntologyEdge } from './ontology';

export const ontologyData: { nodes: OntologyNode[]; edges: OntologyEdge[] } = {
  "nodes": [
    {
      "id": "context-retail",
      "type": "context",
      "name": "리테일 스토어",
      "description": "전체 리테일 비즈니스 컨텍스트"
    },
    {
      "id": "branch-ST001",
      "type": "context",
      "name": "강남점",
      "description": "강남점 (서울), 등급: 대형",
      "location": "서울",
      "grade": "대형"
    },
    {
      "id": "branch-ST002",
      "type": "context",
      "name": "부산해운대점",
      "description": "부산해운대점 (부산), 등급: 중형",
      "location": "부산",
      "grade": "중형"
    },
    {
      "id": "branch-ST003",
      "type": "context",
      "name": "대구동성로점",
      "description": "대구동성로점 (대구), 등급: 중형",
      "location": "대구",
      "grade": "중형"
    },
    {
      "id": "branch-ST004",
      "type": "context",
      "name": "인천송도점",
      "description": "인천송도점 (인천), 등급: 대형",
      "location": "인천",
      "grade": "대형"
    },
    {
      "id": "branch-ST005",
      "type": "context",
      "name": "광주상무점",
      "description": "광주상무점 (광주), 등급: 소형",
      "location": "광주",
      "grade": "소형"
    },
    {
      "id": "category-전자제품",
      "type": "context",
      "name": "전자제품",
      "description": "전자제품 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "category-의류-패션",
      "type": "context",
      "name": "의류/패션",
      "description": "의류/패션 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "category-식품-음료",
      "type": "context",
      "name": "식품/음료",
      "description": "식품/음료 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "category-홈-주방",
      "type": "context",
      "name": "홈/주방",
      "description": "홈/주방 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "category-스포츠-레저",
      "type": "context",
      "name": "스포츠/레저",
      "description": "스포츠/레저 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "category-뷰티-헬스",
      "type": "context",
      "name": "뷰티/헬스",
      "description": "뷰티/헬스 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "category-도서-문구",
      "type": "context",
      "name": "도서/문구",
      "description": "도서/문구 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "category-완구-취미",
      "type": "context",
      "name": "완구/취미",
      "description": "완구/취미 카테고리",
      "category_type": "product_category"
    },
    {
      "id": "subcategory-노트북",
      "type": "context",
      "name": "노트북",
      "description": "노트북 소분류"
    },
    {
      "id": "subcategory-이어폰",
      "type": "context",
      "name": "이어폰",
      "description": "이어폰 소분류"
    },
    {
      "id": "subcategory-게임기",
      "type": "context",
      "name": "게임기",
      "description": "게임기 소분류"
    },
    {
      "id": "subcategory-스마트폰",
      "type": "context",
      "name": "스마트폰",
      "description": "스마트폰 소분류"
    },
    {
      "id": "subcategory-카메라",
      "type": "context",
      "name": "카메라",
      "description": "카메라 소분류"
    },
    {
      "id": "subcategory-스마트워치",
      "type": "context",
      "name": "스마트워치",
      "description": "스마트워치 소분류"
    },
    {
      "id": "subcategory-스피커",
      "type": "context",
      "name": "스피커",
      "description": "스피커 소분류"
    },
    {
      "id": "subcategory-태블릿",
      "type": "context",
      "name": "태블릿",
      "description": "태블릿 소분류"
    },
    {
      "id": "subcategory-원피스",
      "type": "context",
      "name": "원피스",
      "description": "원피스 소분류"
    },
    {
      "id": "subcategory-양말",
      "type": "context",
      "name": "양말",
      "description": "양말 소분류"
    },
    {
      "id": "subcategory-모자",
      "type": "context",
      "name": "모자",
      "description": "모자 소분류"
    },
    {
      "id": "subcategory-자켓",
      "type": "context",
      "name": "자켓",
      "description": "자켓 소분류"
    },
    {
      "id": "subcategory-청바지",
      "type": "context",
      "name": "청바지",
      "description": "청바지 소분류"
    },
    {
      "id": "subcategory-가방",
      "type": "context",
      "name": "가방",
      "description": "가방 소분류"
    },
    {
      "id": "subcategory-신발",
      "type": "context",
      "name": "신발",
      "description": "신발 소분류"
    },
    {
      "id": "subcategory-티셔츠",
      "type": "context",
      "name": "티셔츠",
      "description": "티셔츠 소분류"
    },
    {
      "id": "subcategory-건강식품",
      "type": "context",
      "name": "건강식품",
      "description": "건강식품 소분류"
    },
    {
      "id": "subcategory-초콜릿",
      "type": "context",
      "name": "초콜릿",
      "description": "초콜릿 소분류"
    },
    {
      "id": "subcategory-음료",
      "type": "context",
      "name": "음료",
      "description": "음료 소분류"
    },
    {
      "id": "subcategory-유제품",
      "type": "context",
      "name": "유제품",
      "description": "유제품 소분류"
    },
    {
      "id": "brand-자체PB",
      "type": "context",
      "name": "자체PB",
      "description": "자체PB 브랜드"
    },
    {
      "id": "brand-수입품",
      "type": "context",
      "name": "수입품",
      "description": "수입품 브랜드"
    },
    {
      "id": "brand-A브랜드",
      "type": "context",
      "name": "A브랜드",
      "description": "A브랜드 브랜드"
    },
    {
      "id": "brand-F브랜드",
      "type": "context",
      "name": "F브랜드",
      "description": "F브랜드 브랜드"
    },
    {
      "id": "brand-B브랜드",
      "type": "context",
      "name": "B브랜드",
      "description": "B브랜드 브랜드"
    },
    {
      "id": "brand-D브랜드",
      "type": "context",
      "name": "D브랜드",
      "description": "D브랜드 브랜드"
    },
    {
      "id": "brand-C브랜드",
      "type": "context",
      "name": "C브랜드",
      "description": "C브랜드 브랜드"
    },
    {
      "id": "brand-E브랜드",
      "type": "context",
      "name": "E브랜드",
      "description": "E브랜드 브랜드"
    },
    {
      "id": "SKU00001",
      "type": "field",
      "name": "노트북 A브랜드 001",
      "description": "노트북 A브랜드 001",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "노트북",
      "brand": "자체PB",
      "price": 114670,
      "cost": 46980
    },
    {
      "id": "SKU00002",
      "type": "field",
      "name": "노트북 B브랜드 002",
      "description": "노트북 B브랜드 002",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "노트북",
      "brand": "수입품",
      "price": 123690,
      "cost": 61280
    },
    {
      "id": "SKU00003",
      "type": "field",
      "name": "이어폰 D브랜드 003",
      "description": "이어폰 D브랜드 003",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "이어폰",
      "brand": "A브랜드",
      "price": 56870,
      "cost": 38240
    },
    {
      "id": "SKU00004",
      "type": "field",
      "name": "게임기 D브랜드 004",
      "description": "게임기 D브랜드 004",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "게임기",
      "brand": "F브랜드",
      "price": 80290,
      "cost": 34320
    },
    {
      "id": "SKU00005",
      "type": "field",
      "name": "스마트폰 C브랜드 005",
      "description": "스마트폰 C브랜드 005",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스마트폰",
      "brand": "수입품",
      "price": 120470,
      "cost": 56040
    },
    {
      "id": "SKU00006",
      "type": "field",
      "name": "이어폰 E브랜드 006",
      "description": "이어폰 E브랜드 006",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "이어폰",
      "brand": "B브랜드",
      "price": 80860,
      "cost": 32820
    },
    {
      "id": "SKU00007",
      "type": "field",
      "name": "카메라 E브랜드 007",
      "description": "카메라 E브랜드 007",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "카메라",
      "brand": "자체PB",
      "price": 101530,
      "cost": 65300
    },
    {
      "id": "SKU00008",
      "type": "field",
      "name": "노트북 수입품 008",
      "description": "노트북 수입품 008",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "노트북",
      "brand": "B브랜드",
      "price": 59690,
      "cost": 39270
    },
    {
      "id": "SKU00009",
      "type": "field",
      "name": "카메라 D브랜드 009",
      "description": "카메라 D브랜드 009",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "카메라",
      "brand": "B브랜드",
      "price": 85240,
      "cost": 44170
    },
    {
      "id": "SKU00010",
      "type": "field",
      "name": "스마트워치 B브랜드 010",
      "description": "스마트워치 B브랜드 010",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스마트워치",
      "brand": "D브랜드",
      "price": 81290,
      "cost": 49280
    },
    {
      "id": "SKU00011",
      "type": "field",
      "name": "스피커 E브랜드 011",
      "description": "스피커 E브랜드 011",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스피커",
      "brand": "C브랜드",
      "price": 82860,
      "cost": 56470
    },
    {
      "id": "SKU00012",
      "type": "field",
      "name": "스마트워치 B브랜드 012",
      "description": "스마트워치 B브랜드 012",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스마트워치",
      "brand": "C브랜드",
      "price": 76000,
      "cost": 43690
    },
    {
      "id": "SKU00013",
      "type": "field",
      "name": "게임기 자체PB 013",
      "description": "게임기 자체PB 013",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "게임기",
      "brand": "D브랜드",
      "price": 112650,
      "cost": 50240
    },
    {
      "id": "SKU00014",
      "type": "field",
      "name": "스마트폰 D브랜드 014",
      "description": "스마트폰 D브랜드 014",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스마트폰",
      "brand": "A브랜드",
      "price": 76660,
      "cost": 39990
    },
    {
      "id": "SKU00015",
      "type": "field",
      "name": "노트북 D브랜드 015",
      "description": "노트북 D브랜드 015",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "노트북",
      "brand": "E브랜드",
      "price": 75510,
      "cost": 55700
    },
    {
      "id": "SKU00016",
      "type": "field",
      "name": "게임기 F브랜드 016",
      "description": "게임기 F브랜드 016",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "게임기",
      "brand": "C브랜드",
      "price": 84710,
      "cost": 56300
    },
    {
      "id": "SKU00017",
      "type": "field",
      "name": "스마트워치 수입품 017",
      "description": "스마트워치 수입품 017",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스마트워치",
      "brand": "수입품",
      "price": 84380,
      "cost": 34600
    },
    {
      "id": "SKU00018",
      "type": "field",
      "name": "태블릿 F브랜드 018",
      "description": "태블릿 F브랜드 018",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "태블릿",
      "brand": "B브랜드",
      "price": 160340,
      "cost": 70630
    },
    {
      "id": "SKU00019",
      "type": "field",
      "name": "태블릿 C브랜드 019",
      "description": "태블릿 C브랜드 019",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "태블릿",
      "brand": "수입품",
      "price": 62610,
      "cost": 44180
    },
    {
      "id": "SKU00020",
      "type": "field",
      "name": "스피커 자체PB 020",
      "description": "스피커 자체PB 020",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스피커",
      "brand": "A브랜드",
      "price": 108540,
      "cost": 59370
    },
    {
      "id": "SKU00021",
      "type": "field",
      "name": "스마트워치 E브랜드 021",
      "description": "스마트워치 E브랜드 021",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스마트워치",
      "brand": "B브랜드",
      "price": 69860,
      "cost": 36880
    },
    {
      "id": "SKU00022",
      "type": "field",
      "name": "스피커 A브랜드 022",
      "description": "스피커 A브랜드 022",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "스피커",
      "brand": "자체PB",
      "price": 79820,
      "cost": 33380
    },
    {
      "id": "SKU00023",
      "type": "field",
      "name": "노트북 자체PB 023",
      "description": "노트북 자체PB 023",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "노트북",
      "brand": "D브랜드",
      "price": 88720,
      "cost": 42350
    },
    {
      "id": "SKU00024",
      "type": "field",
      "name": "태블릿 A브랜드 024",
      "description": "태블릿 A브랜드 024",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "태블릿",
      "brand": "E브랜드",
      "price": 85560,
      "cost": 44470
    },
    {
      "id": "SKU00025",
      "type": "field",
      "name": "카메라 자체PB 025",
      "description": "카메라 자체PB 025",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "카메라",
      "brand": "D브랜드",
      "price": 81980,
      "cost": 53870
    },
    {
      "id": "SKU00026",
      "type": "field",
      "name": "노트북 B브랜드 026",
      "description": "노트북 B브랜드 026",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "노트북",
      "brand": "F브랜드",
      "price": 157850,
      "cost": 70780
    },
    {
      "id": "SKU00027",
      "type": "field",
      "name": "태블릿 C브랜드 027",
      "description": "태블릿 C브랜드 027",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "태블릿",
      "brand": "F브랜드",
      "price": 165170,
      "cost": 69580
    },
    {
      "id": "SKU00028",
      "type": "field",
      "name": "게임기 D브랜드 028",
      "description": "게임기 D브랜드 028",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "게임기",
      "brand": "D브랜드",
      "price": 134560,
      "cost": 55920
    },
    {
      "id": "SKU00029",
      "type": "field",
      "name": "카메라 F브랜드 029",
      "description": "카메라 F브랜드 029",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "카메라",
      "brand": "F브랜드",
      "price": 54560,
      "cost": 35540
    },
    {
      "id": "SKU00030",
      "type": "field",
      "name": "노트북 E브랜드 030",
      "description": "노트북 E브랜드 030",
      "dataType": "string",
      "category": "전자제품",
      "subcategory": "노트북",
      "brand": "A브랜드",
      "price": 57150,
      "cost": 33810
    },
    {
      "id": "sales-query",
      "type": "request",
      "name": "매출 조회",
      "description": "지점별 매출 데이터 조회 요청"
    },
    {
      "id": "inventory-query",
      "type": "request",
      "name": "재고 확인",
      "description": "SKU별 재고 상태 확인"
    },
    {
      "id": "top-product",
      "type": "request",
      "name": "인기 상품",
      "description": "판매량이 많은 상품 조회"
    },
    {
      "id": "profit-analysis",
      "type": "request",
      "name": "수익 분석",
      "description": "지점별 수익 분석 요청"
    },
    {
      "id": "category-analysis",
      "type": "request",
      "name": "카테고리 분석",
      "description": "카테고리별 성과 분석"
    },
    {
      "id": "sales-report",
      "type": "output",
      "name": "매출 보고서",
      "description": "매출 보고서 출력"
    },
    {
      "id": "inventory-report",
      "type": "output",
      "name": "재고 보고서",
      "description": "재고 보고서 출력"
    },
    {
      "id": "top-product-list",
      "type": "output",
      "name": "인기 상품 목록",
      "description": "인기 상품 목록 출력"
    },
    {
      "id": "profit-report",
      "type": "output",
      "name": "수익 분석 보고서",
      "description": "수익 분석 보고서 출력"
    },
    {
      "id": "category-report",
      "type": "output",
      "name": "카테고리 분석 보고서",
      "description": "카테고리 분석 보고서 출력"
    }
  ],
  "edges": [
    {
      "id": "edge-retail-전자제품",
      "source": "context-retail",
      "target": "category-전자제품",
      "label": "contains"
    },
    {
      "id": "edge-retail-의류-패션",
      "source": "context-retail",
      "target": "category-의류-패션",
      "label": "contains"
    },
    {
      "id": "edge-retail-식품-음료",
      "source": "context-retail",
      "target": "category-식품-음료",
      "label": "contains"
    },
    {
      "id": "edge-retail-홈-주방",
      "source": "context-retail",
      "target": "category-홈-주방",
      "label": "contains"
    },
    {
      "id": "edge-retail-스포츠-레저",
      "source": "context-retail",
      "target": "category-스포츠-레저",
      "label": "contains"
    },
    {
      "id": "edge-retail-뷰티-헬스",
      "source": "context-retail",
      "target": "category-뷰티-헬스",
      "label": "contains"
    },
    {
      "id": "edge-retail-도서-문구",
      "source": "context-retail",
      "target": "category-도서-문구",
      "label": "contains"
    },
    {
      "id": "edge-retail-완구-취미",
      "source": "context-retail",
      "target": "category-완구-취미",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-노트북",
      "source": "category-전자제품",
      "target": "subcategory-노트북",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-이어폰",
      "source": "category-전자제품",
      "target": "subcategory-이어폰",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-게임기",
      "source": "category-전자제품",
      "target": "subcategory-게임기",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-스마트폰",
      "source": "category-전자제품",
      "target": "subcategory-스마트폰",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-카메라",
      "source": "category-전자제품",
      "target": "subcategory-카메라",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-스마트워치",
      "source": "category-전자제품",
      "target": "subcategory-스마트워치",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-스피커",
      "source": "category-전자제품",
      "target": "subcategory-스피커",
      "label": "contains"
    },
    {
      "id": "edge-category-전자제품-subcategory-태블릿",
      "source": "category-전자제품",
      "target": "subcategory-태블릿",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-원피스",
      "source": "category-의류-패션",
      "target": "subcategory-원피스",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-양말",
      "source": "category-의류-패션",
      "target": "subcategory-양말",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-모자",
      "source": "category-의류-패션",
      "target": "subcategory-모자",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-자켓",
      "source": "category-의류-패션",
      "target": "subcategory-자켓",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-청바지",
      "source": "category-의류-패션",
      "target": "subcategory-청바지",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-가방",
      "source": "category-의류-패션",
      "target": "subcategory-가방",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-신발",
      "source": "category-의류-패션",
      "target": "subcategory-신발",
      "label": "contains"
    },
    {
      "id": "edge-category-의류-패션-subcategory-티셔츠",
      "source": "category-의류-패션",
      "target": "subcategory-티셔츠",
      "label": "contains"
    },
    {
      "id": "edge-category-식품-음료-subcategory-건강식품",
      "source": "category-식품-음료",
      "target": "subcategory-건강식품",
      "label": "contains"
    },
    {
      "id": "edge-category-식품-음료-subcategory-초콜릿",
      "source": "category-식품-음료",
      "target": "subcategory-초콜릿",
      "label": "contains"
    },
    {
      "id": "edge-category-식품-음료-subcategory-음료",
      "source": "category-식품-음료",
      "target": "subcategory-음료",
      "label": "contains"
    },
    {
      "id": "edge-category-식품-음료-subcategory-유제품",
      "source": "category-식품-음료",
      "target": "subcategory-유제품",
      "label": "contains"
    },
    {
      "id": "edge-SKU00001-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00001",
      "label": "contains"
    },
    {
      "id": "edge-SKU00001-brand-자체PB",
      "source": "SKU00001",
      "target": "brand-자체PB",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00002-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00002",
      "label": "contains"
    },
    {
      "id": "edge-SKU00002-brand-수입품",
      "source": "SKU00002",
      "target": "brand-수입품",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00003-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00003",
      "label": "contains"
    },
    {
      "id": "edge-SKU00003-brand-A브랜드",
      "source": "SKU00003",
      "target": "brand-A브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00004-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00004",
      "label": "contains"
    },
    {
      "id": "edge-SKU00004-brand-F브랜드",
      "source": "SKU00004",
      "target": "brand-F브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00005-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00005",
      "label": "contains"
    },
    {
      "id": "edge-SKU00005-brand-수입품",
      "source": "SKU00005",
      "target": "brand-수입품",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00006-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00006",
      "label": "contains"
    },
    {
      "id": "edge-SKU00006-brand-B브랜드",
      "source": "SKU00006",
      "target": "brand-B브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00007-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00007",
      "label": "contains"
    },
    {
      "id": "edge-SKU00007-brand-자체PB",
      "source": "SKU00007",
      "target": "brand-자체PB",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00008-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00008",
      "label": "contains"
    },
    {
      "id": "edge-SKU00008-brand-B브랜드",
      "source": "SKU00008",
      "target": "brand-B브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00009-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00009",
      "label": "contains"
    },
    {
      "id": "edge-SKU00009-brand-B브랜드",
      "source": "SKU00009",
      "target": "brand-B브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00010-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00010",
      "label": "contains"
    },
    {
      "id": "edge-SKU00010-brand-D브랜드",
      "source": "SKU00010",
      "target": "brand-D브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00011-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00011",
      "label": "contains"
    },
    {
      "id": "edge-SKU00011-brand-C브랜드",
      "source": "SKU00011",
      "target": "brand-C브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00012-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00012",
      "label": "contains"
    },
    {
      "id": "edge-SKU00012-brand-C브랜드",
      "source": "SKU00012",
      "target": "brand-C브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00013-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00013",
      "label": "contains"
    },
    {
      "id": "edge-SKU00013-brand-D브랜드",
      "source": "SKU00013",
      "target": "brand-D브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00014-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00014",
      "label": "contains"
    },
    {
      "id": "edge-SKU00014-brand-A브랜드",
      "source": "SKU00014",
      "target": "brand-A브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00015-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00015",
      "label": "contains"
    },
    {
      "id": "edge-SKU00015-brand-E브랜드",
      "source": "SKU00015",
      "target": "brand-E브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00016-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00016",
      "label": "contains"
    },
    {
      "id": "edge-SKU00016-brand-C브랜드",
      "source": "SKU00016",
      "target": "brand-C브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00017-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00017",
      "label": "contains"
    },
    {
      "id": "edge-SKU00017-brand-수입품",
      "source": "SKU00017",
      "target": "brand-수입품",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00018-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00018",
      "label": "contains"
    },
    {
      "id": "edge-SKU00018-brand-B브랜드",
      "source": "SKU00018",
      "target": "brand-B브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00019-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00019",
      "label": "contains"
    },
    {
      "id": "edge-SKU00019-brand-수입품",
      "source": "SKU00019",
      "target": "brand-수입품",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00020-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00020",
      "label": "contains"
    },
    {
      "id": "edge-SKU00020-brand-A브랜드",
      "source": "SKU00020",
      "target": "brand-A브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00021-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00021",
      "label": "contains"
    },
    {
      "id": "edge-SKU00021-brand-B브랜드",
      "source": "SKU00021",
      "target": "brand-B브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00022-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00022",
      "label": "contains"
    },
    {
      "id": "edge-SKU00022-brand-자체PB",
      "source": "SKU00022",
      "target": "brand-자체PB",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00023-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00023",
      "label": "contains"
    },
    {
      "id": "edge-SKU00023-brand-D브랜드",
      "source": "SKU00023",
      "target": "brand-D브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00024-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00024",
      "label": "contains"
    },
    {
      "id": "edge-SKU00024-brand-E브랜드",
      "source": "SKU00024",
      "target": "brand-E브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00025-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00025",
      "label": "contains"
    },
    {
      "id": "edge-SKU00025-brand-D브랜드",
      "source": "SKU00025",
      "target": "brand-D브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00026-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00026",
      "label": "contains"
    },
    {
      "id": "edge-SKU00026-brand-F브랜드",
      "source": "SKU00026",
      "target": "brand-F브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00027-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00027",
      "label": "contains"
    },
    {
      "id": "edge-SKU00027-brand-F브랜드",
      "source": "SKU00027",
      "target": "brand-F브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00028-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00028",
      "label": "contains"
    },
    {
      "id": "edge-SKU00028-brand-D브랜드",
      "source": "SKU00028",
      "target": "brand-D브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00029-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00029",
      "label": "contains"
    },
    {
      "id": "edge-SKU00029-brand-F브랜드",
      "source": "SKU00029",
      "target": "brand-F브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-SKU00030-category-전자제품",
      "source": "category-전자제품",
      "target": "SKU00030",
      "label": "contains"
    },
    {
      "id": "edge-SKU00030-brand-A브랜드",
      "source": "SKU00030",
      "target": "brand-A브랜드",
      "label": "manufactured_by"
    },
    {
      "id": "edge-sales-query-sales-report",
      "source": "sales-query",
      "target": "sales-report",
      "label": "produces"
    },
    {
      "id": "edge-inventory-query-inventory-report",
      "source": "inventory-query",
      "target": "inventory-report",
      "label": "produces"
    },
    {
      "id": "edge-top-product-top-product-list",
      "source": "top-product",
      "target": "top-product-list",
      "label": "produces"
    },
    {
      "id": "edge-profit-analysis-profit-report",
      "source": "profit-analysis",
      "target": "profit-report",
      "label": "produces"
    },
    {
      "id": "edge-category-analysis-category-report",
      "source": "category-analysis",
      "target": "category-report",
      "label": "produces"
    },
    {
      "id": "edge-branch-ST001-category-도서-문구",
      "source": "branch-ST001",
      "target": "category-도서-문구",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST001-category-뷰티-헬스",
      "source": "branch-ST001",
      "target": "category-뷰티-헬스",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST001-category-스포츠-레저",
      "source": "branch-ST001",
      "target": "category-스포츠-레저",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST001-category-식품-음료",
      "source": "branch-ST001",
      "target": "category-식품-음료",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST001-category-완구-취미",
      "source": "branch-ST001",
      "target": "category-완구-취미",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST001-category-의류-패션",
      "source": "branch-ST001",
      "target": "category-의류-패션",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST001-category-전자제품",
      "source": "branch-ST001",
      "target": "category-전자제품",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST001-category-홈-주방",
      "source": "branch-ST001",
      "target": "category-홈-주방",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-도서-문구",
      "source": "branch-ST002",
      "target": "category-도서-문구",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-뷰티-헬스",
      "source": "branch-ST002",
      "target": "category-뷰티-헬스",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-스포츠-레저",
      "source": "branch-ST002",
      "target": "category-스포츠-레저",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-식품-음료",
      "source": "branch-ST002",
      "target": "category-식품-음료",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-완구-취미",
      "source": "branch-ST002",
      "target": "category-완구-취미",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-의류-패션",
      "source": "branch-ST002",
      "target": "category-의류-패션",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-전자제품",
      "source": "branch-ST002",
      "target": "category-전자제품",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST002-category-홈-주방",
      "source": "branch-ST002",
      "target": "category-홈-주방",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-도서-문구",
      "source": "branch-ST003",
      "target": "category-도서-문구",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-뷰티-헬스",
      "source": "branch-ST003",
      "target": "category-뷰티-헬스",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-스포츠-레저",
      "source": "branch-ST003",
      "target": "category-스포츠-레저",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-식품-음료",
      "source": "branch-ST003",
      "target": "category-식품-음료",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-완구-취미",
      "source": "branch-ST003",
      "target": "category-완구-취미",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-의류-패션",
      "source": "branch-ST003",
      "target": "category-의류-패션",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-전자제품",
      "source": "branch-ST003",
      "target": "category-전자제품",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST003-category-홈-주방",
      "source": "branch-ST003",
      "target": "category-홈-주방",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-도서-문구",
      "source": "branch-ST004",
      "target": "category-도서-문구",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-뷰티-헬스",
      "source": "branch-ST004",
      "target": "category-뷰티-헬스",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-스포츠-레저",
      "source": "branch-ST004",
      "target": "category-스포츠-레저",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-식품-음료",
      "source": "branch-ST004",
      "target": "category-식품-음료",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-완구-취미",
      "source": "branch-ST004",
      "target": "category-완구-취미",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-의류-패션",
      "source": "branch-ST004",
      "target": "category-의류-패션",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-전자제품",
      "source": "branch-ST004",
      "target": "category-전자제품",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST004-category-홈-주방",
      "source": "branch-ST004",
      "target": "category-홈-주방",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-도서-문구",
      "source": "branch-ST005",
      "target": "category-도서-문구",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-뷰티-헬스",
      "source": "branch-ST005",
      "target": "category-뷰티-헬스",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-스포츠-레저",
      "source": "branch-ST005",
      "target": "category-스포츠-레저",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-식품-음료",
      "source": "branch-ST005",
      "target": "category-식품-음료",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-완구-취미",
      "source": "branch-ST005",
      "target": "category-완구-취미",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-의류-패션",
      "source": "branch-ST005",
      "target": "category-의류-패션",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-전자제품",
      "source": "branch-ST005",
      "target": "category-전자제품",
      "label": "sells"
    },
    {
      "id": "edge-branch-ST005-category-홈-주방",
      "source": "branch-ST005",
      "target": "category-홈-주방",
      "label": "sells"
    }
  ]
};
