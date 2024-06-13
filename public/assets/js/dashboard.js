const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top',
    },
    types: [
        {
            type: 'alert',
            background: '#6BBFBD',
            icon: false,
            duration: 3000
        }
    ]
});

document.querySelectorAll(".main__manageHistoryGame__manager__container .favorite").forEach(container => {
    container.addEventListener("click", () => {
        const getQuizid = container.id.includes("_add") ? container.id.split("_add")[0] : container.id.split("_remove")[0]
        $.ajax({
            type: "POST",
            url: "/favorite/remove",
            data: {
                _token: document.querySelector(`.form${getQuizid} input[name=_token]`).value,
                quizId: getQuizid
            },
            success: function (response) {
                document.querySelector(".div" + getQuizid).remove()
                notyf.open({
                    type: 'success',
                    message: 'Retiré des favoris'
                });
                if(Number(response.length) === 0) location.reload()
            },
            error: function (err) {
                console.log(err);
                if (err.responseJSON.status === "favorite-not-added") notyf.open({
                    type: 'error',
                    message: '<p style="text-align:center">Ce quiz ne fait pas partie de vos favoris</p>'
                });
                else notyf.open({
                    type: 'error',
                    message: '<p style="text-align:center">Veuillez-vous créer un compte</p>'
                });
            }
        });
    })
})