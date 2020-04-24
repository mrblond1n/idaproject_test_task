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

<style>
@font-face {
  font-family: "Source Sans Pro";
  src: url("~@/assets/fonts/SourceSansPro-Regular.woff2") format("woff2"),
    url("~@/assets/fonts/SourceSansPro-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

#app {
  display: grid;
  font-size: 14px;
  grid-template-areas: ". header ." ". main ." "footer footer footer";
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
</style>
