if (isClientProfile && isMainProfilePage && typeof localStorage.getItem("__amplify__cache:game:last-played") !== "undefined") {
    const createGameCard = (game) => {
        return createElement("li.game-item", {
            style: "width: 100%;"
        }, [
            createElement("a", {
                href: `/games/play/${game.id}/`,
                style: "max-width: unset; max-height: 170px; overflow: hidden;"
            }, [
                createElement("div.game-image.MuiPaper-rounded", {
                    style: `background-image: url(${game.images.medium});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 500px; 
    height: 281px;`
                }),
                createElement("div.game-stats-online", [
                    createElement("a", {
                        href: game.images.medium,
                        target: "_blank",
                        style: "box-shadow: unset; font-size: 1rem; opacity: 0.5;"
                    }, [
                        createElement("i.icon-camera")
                    ])
                ]),
                createElement("div.game-name-stats", [
                    createElement("div.game-name", decodeEntities(game.name)),
                    createElement("ul.game-stats", [
                        createElement("li.game-likes", [
                            createElement("span.data.tool-top", {
                                "data-placement": "top",
                                "data-original-title": "Likes"
                            }, [
                                createElement("i.icon-heart"),
                                " " + game.likes.toLocaleString("fr-FR")
                            ])
                        ]),
                        createElement("li.game-played", [
                            createElement("span.data.tool-top", {
                                "data-placement": "top",
                                "data-original-title": "Play count"
                            }, [
                                createElement("i.icon-gamepad"),
                                " " + game.played.toLocaleString("fr-FR")
                            ])
                        ])
                    ])
                ])
            ])
        ])
    };
    const storedData = localStorage.getItem("__amplify__cache:game:last-played");
    // Check if storedData is not null before parsing
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Ensure that parsedData has a 'data' property
        if (parsedData && parsedData.data) {
            const gameData = parsedData.data;

            setTimeout(() => {
                const parentElement = document.querySelector("._9smi2");
                if (parentElement) {
                    parentElement.appendChild(
                        createElement("div.section-description", [
                            createElement("div.description-container", {
                                style: "max-height: unset;"
                            }, [
                                createElement("div.header", "Last Played Game"),
                                createElement("ul.games-list", {
                                    style: "padding: 4px 10px 8px; margin: 0;"
                                }, [createGameCard(gameData)])
                            ])
                        ])
                    );
                }
            }, 800);
        }
    }
}
