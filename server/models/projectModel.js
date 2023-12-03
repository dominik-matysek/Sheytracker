const mongoose = require("mongoose"); 
// U ciebie role będą najprawdopodobniej trochę inaczej działały, z uwagi na to że masz np. admina, który nie jest
// członkiem żadnego projektu ani zespołu, ale jednak rola admina daje mu jakieś tam możliwości zarządzania stroną
// W tym projekcie admin jest częścią projektu po prostu, więc rozwiązanie ról w taki sposób jak niżej ma jakiś sens
// U ciebie musisz role uniezależnić od projektu najprawdopodobniej, czyli wrzucić je już do modelu usera czy coś


const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projects", projectSchema);