<template>
  <div id="app">
    <header>
      <h1>Table UI</h1>
    </header>
    <main>
      <app-table></app-table>
    </main>
    <footer>
      Author
      <a href="mailto:nikita.kirdiapin@gmail.com">Nikita Kirdiapin</a>
      /
      resume
      <a href="https://hh.ru/resume/56394832ff0719637a0039ed1f624141343041">link</a>
    </footer>
  </div>
</template>

<script>
import appTable from "@/components/Table";
export default {
  components: {
    appTable
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Source Sans Pro";
  src: url("~@/assets/fonts/SourceSansPro-Regular.woff2") format("woff2"),
    url("~@/assets/fonts/SourceSansPro-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
html {
  font-size: 14px;
}

body {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  background: $bg-color;
}

*:focus {
  outline: 0 !important;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

button,
input,
select,
textarea {
  background-color: transparent;
  border-style: none;
  color: inherit;
}

a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  border-bottom: 1px solid transparent;

  &:hover {
    border-color: white;
  }
}

#app {
  display: grid;
  min-height: 100vh;
  grid-template-areas: ". header ." ". main ." "footer footer footer";
  grid-template-rows: auto auto auto;
  grid-template-columns: 5% auto 5%;
  align-items: center;
}

header {
  grid-area: header;
  border-bottom: 1px solid #ededed;
  padding: 2rem 0 1rem 0;
}
main {
  grid-area: main;
}
footer {
  grid-area: footer;
  padding: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  margin-top: 20px;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
