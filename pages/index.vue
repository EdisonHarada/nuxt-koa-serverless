<template>
  <div class="container">
    <div>
      <LogoComponent />
      <h1 class="title">
        Nuxt with Typescript in Koa Serverless =)
      </h1>
      <h1 class="subtitle">
        More details: https://www.linkedin.com/pulse/nuxt-typescript-koa-serverless-edison-harada
      </h1>
      <div>
        ServerSide
        {{ serverSideIp }}
      </div>
      <div>
        ClientSide
        {{ clientSideIp }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    LogoComponent: () => import('@/components/Logo.vue')
  },
  async asyncData({ app }) {
    return {
      serverSideIp: (await app.$axios.get('https://api.ipify.org?format=json')).data.ip
    }
  }
})
export default class HomeComponent extends Vue {
  private serverSideIp: string = '';
  private clientSideIp: string = '';

  private async mounted(): Promise<void> {
    this.clientSideIp = (await this.$axios.get('https://api.ipify.org?format=json')).data.ip
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
