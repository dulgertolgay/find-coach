<template>
  <div>
    <section>
      <base-card>
        <h2>{{ selectedCoach.firstName }} {{ selectedCoach.lastName }}</h2>
        <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null
    };
  },
  computed: {
    areas() {
      return this.selectedCoach.areas;
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    }
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      coach => coach.id === this.id
    );
  }
};
</script>
