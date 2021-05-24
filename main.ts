// as of 5/23/2021

function gasOffTrack () {
    hero.x += x / 2.1
    hero.y += y / 2.1
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    wallHit = soundEffects.createSound(soundEffects.waveNumber(WaveType.WhiteNoise), 100, 140, 145, 80, 100)
    wallHit.play()
})
function decelerate () {
    for (let index = 0; index < acceleration; index++) {
        if (isOnRoad) {
            hero.x += x
            hero.y += y
        } else {
            hero.x += x / 2
            hero.y += y / 2
        }
        acceleration += -1
        pause(50)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isOnRoad) {
        reverseOnTrack()
    } else {
        reverseOffTrack()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    isOnRoad = 0
})
function playBackgroundMusic () {
    timer.debounce("playBackgroundMusic", 500, function () {
        while (true) {
            music.setTempo(200)
            music.playTone(523, music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Eighth))
            music.playTone(523, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Eighth))
            music.playTone(523, music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(523, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Quarter))
            music.playTone(523, music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Eighth))
            music.playTone(523, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Sixteenth))
            music.playTone(523, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(587, music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Eighth))
            music.playTone(587, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Eighth))
            music.playTone(587, music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(587, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Eighth))
            music.playTone(587, music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Eighth))
        }
        timer.throttle("action", 20000, function () {
        	
        })
    })
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isOnRoad) {
        gasOnTrack()
    } else {
        gasOffTrack()
    }
})
function reverseOnTrack () {
    hero.x += x * 0.75 * -1
    hero.y += y * 0.75 * -1
}
function gasOnTrack () {
    hero.x += x
    hero.y += y
}
function startRacePrompt () {
    timer.after(25, function () {
        for (let value of countDown) {
            game.setDialogFrame(assets.image`startFrame`)
            game.setDialogTextColor(1)
            game.showLongText(value, DialogLayout.Center)
        }
    })
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("rotateClockwise", 100, function () {
        transformSprites.changeRotation(hero, 45)
    })
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.changeRotation(hero, -45)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`checkPointTile`, function (sprite, location) {
    timer.throttle("addToCheckPointList", 500, function () {
        checkPointList.push("\"C\"")
    })
})
function playReverseSound () {
    reverseReverse = soundEffects.createSound(soundEffects.waveNumber(WaveType.Cycle16), 200, 80, 120, 60, 75)
    reverseReverse.play()
}
function playAccelerationSound (decelerationDuration: number) {
    vroom = soundEffects.createSound(soundEffects.waveNumber(WaveType.Square10), decelerationDuration * 25, 170, 200, 100, 150)
    vroom.play()
}
function applyVelocityAccordingToRotation () {
    if (transformSprites.getRotation(hero) < 0) {
        transformSprites.rotateSprite(hero, transformSprites.getRotation(hero) + 360)
    }
    if (transformSprites.getRotation(hero) == 360) {
        transformSprites.rotateSprite(hero, 0)
    }
    if (transformSprites.getRotation(hero) == 0) {
        x = speed
        y = 0
    }
    if (transformSprites.getRotation(hero) == 45) {
        x = speed
        y = speed
    }
    if (transformSprites.getRotation(hero) == 90) {
        x = 0
        y = speed
    }
    if (transformSprites.getRotation(hero) == 135) {
        x = speed * -1
        y = speed
    }
    if (transformSprites.getRotation(hero) == 180) {
        x = speed * -1
        y = 0
    }
    if (transformSprites.getRotation(hero) == 225) {
        x = speed * -1
        y = speed * -1
    }
    if (transformSprites.getRotation(hero) == 270) {
        x = 0
        y = speed * -1
    }
    if (transformSprites.getRotation(hero) == 315) {
        x = speed
        y = speed * -1
    }
}
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    playReverseSound()
    if (isOnRoad) {
        reverseOnTrack()
    } else {
        reverseOffTrack()
    }
})
function reverseOffTrack () {
    hero.x += x * -1 / 2.3
    hero.y += y * -1 / 2.3
}
function didCompleteRace () {
    if (currentLap == totalLaps) {
        timer.after(500, function () {
            game.over(true)
        })
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.changeRotation(hero, 45)
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tilePath5, function (sprite, location) {
    isOnRoad = 1
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    decelerate()
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    playAccelerationSound(acceleration)
    if (isOnRoad) {
        if (acceleration < dragCoefficient) {
            timer.throttle("increadeAcceleration", 100, function () {
                acceleration += 1
            })
        }
        gasOnTrack()
    } else {
        gasOffTrack()
    }
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    acceleration = 0
})
function checkIfValidLap () {
    if (checkPointList.length == totalCheckPoints) {
        music.baDing.play()
        currentLap += 1
        checkPointList = []
    } else {
        checkPointList = []
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`finishLine`, function (sprite, location) {
    checkIfValidLap()
})
function initVariables () {
    isOnRoad = 1
    totalLaps = 4
    currentLap = 1
    checkPointList = []
    totalCheckPoints = 3
    acceleration = 0
    speed = 4
    dragCoefficient = 200
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("rotateCounterClockwise", 100, function () {
        transformSprites.changeRotation(hero, -45)
    })
})
let totalCheckPoints = 0
let dragCoefficient = 0
let totalLaps = 0
let currentLap = 0
let speed = 0
let vroom: SoundBuffer = null
let reverseReverse: SoundBuffer = null
let checkPointList: string[] = []
let isOnRoad = 0
let acceleration = 0
let wallHit: SoundBuffer = null
let y = 0
let x = 0
let countDown: string[] = []
let hero: Sprite = null
initVariables()
hero = sprites.create(assets.image`Hero_Car`, SpriteKind.Player)
transformSprites.rotateSprite(hero, 0)
hero.setStayInScreen(true)
countDown = ["READY", "SET", "GO!!!"]
scene.cameraFollowSprite(hero)
tiles.setTilemap(tilemap`developer_track`)
tiles.placeOnRandomTile(hero, assets.tile`heroStart`)
startRacePrompt()
forever(function () {
    applyVelocityAccordingToRotation()
    didCompleteRace()
    timer.background(function () {
        playBackgroundMusic()
    })
})
