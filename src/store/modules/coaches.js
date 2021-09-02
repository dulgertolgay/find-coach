export default {
  namespaced: true,
  state() {
    return {
      coaches: []
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    }
  },
  actions: {
    async registerCoach(context, data) {
      const cData = {
        userId: data.first,
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas
      };

      const response = await fetch(
        `https://find-coach-c9467-default-rtdb.europe-west1.firebasedatabase.app//coaches/${data.first}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(cData)
        }
      );

      if (!response.ok) {
        const error = new Error(response.message || 'Failed to send');
        throw error;
      }

      context.commit('registerCoach', {
        ...cData
      });
    },
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh) {
        return;
      }

      const response = await fetch(
        `https://find-coach-c9467-default-rtdb.europe-west1.firebasedatabase.app//coaches.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch');
        throw error;
      }

      const coaches = [];

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas
        };
        coaches.push(coach);
      }

      context.commit('setCoaches', coaches);
    }
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some(coach => coach.id === userId);
    }
  }
};
