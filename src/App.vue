<template>
  <div class="App">
    <!--
  	<header class="hello">管理員系統</header>
    -->
    <nav class="nav-style">
      <router-link class="link" to="/">首頁</router-link> 
      <router-link class="link" to="/employeesManagement">員工管理</router-link>
      <router-link class="link" to="/">工作台設定</router-link>
    </nav>
  	
	<router-view></router-view>
  </div>

  
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
};
</script>

<style scoped>
header.hello {
  padding: .5em;
  font-size: 2em;
  background-color: #b3ccff;
}
nav.nav-style{
  width: 100vw;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
}
/* unvisited link */
.link:link {
  color: white;
  text-decoration: none;
}

/* visited link */
.link:visited {
  color: white;
  text-decoration: none;
}

/* mouse over link */
.link:hover {
  color: lightblue;
  
  text-decoration: none;
}

/* selected link */
.link:active {
  color: lightblue;
  text-decoration: none;
}

</style>