let participants = [];
let fixedSeats = {}; // 固定座席の情報を格納するオブジェクト

function addParticipant() {
  const name = document.getElementById("participantName").value;
  if (name) {
    participants.push(name);
    document.getElementById("participantName").value = ""; // 入力フィールドをクリア
    updateParticipantsList(); // 参加者リストを更新
  }
}

function updateParticipantsList() {
  const listContainer = document.getElementById("participantsList");
  listContainer.innerHTML = ""; // 既存のリストをクリア
  participants.forEach((participant) => {
    const listItem = document.createElement("li");
    listItem.textContent = participant;
    listContainer.appendChild(listItem);
  });
}

function finalizeSeats() {
  let randomParticipants = participants.filter(
    (p) => !fixedSeats.hasOwnProperty(p)
  );
  randomParticipants.sort(() => Math.random() - 0.5); // ランダムに並べ替え

  // 固定された座席を追加
  for (const fixedName in fixedSeats) {
    randomParticipants.splice(fixedSeats[fixedName], 0, fixedName);
  }

  // 結果を表示
  const seatsElement = document.getElementById("seats");
  seatsElement.innerHTML = ""; // 既存のリストをクリア
  randomParticipants.forEach((name, index) => {
    const seat = document.createElement("li");
    seat.textContent = `座席 ${index + 1}: ${name}`;
    seatsElement.appendChild(seat);
  });

  // 参加者リストを非表示
  document.getElementById("participant").style.display = "none";
}

// 特定の参加者を固定座席に設定する隠し機能（例: 特定のキーを押しながら参加者を追加）
document
  .getElementById("participantName")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.shiftKey) {
      const name = this.value;
      const fixedPosition = prompt(
        "この参加者の固定座席番号を入力してください:"
      );
      if (Number(fixedPosition)) {
        fixedSeats[name] = parseInt(fixedPosition) - 1;
        addParticipant(); // 固定された参加者もリストに追加
      } else {
        alert("座席番号は半角数字で入力してください");
      }
    }
  });
