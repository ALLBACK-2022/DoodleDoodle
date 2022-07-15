/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f8d359' /* 메인바탕 */,
          1: '#fffaeb' /* 메인 글씨 색 */,
          2: '#fcf4d8;' /* 그릴 단어 생성 화면 글씨 색 */,
          3: '#dbb750' /* 1인용 결과 페이지 버튼 색 */,
          4: '#fff3cc' /* 메인 버튼 색 */,
        },
        gray: {
          DEFAULT: '#ffffff' /* 기본 회색 */,
          1: '#d9d9d9' /* 그래프 회색 부분 */,
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        cookierun: ['COOKIERUN'],
        cookierun_m: ['COOKIERUN_M'],
        cookierun_s: ['COOKIERUN_S'],
      },
    },
  },
  plugins: [],
};
