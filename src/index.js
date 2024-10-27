var R = 0, r = 0, circleA, circleB, angle = 0, angleB = 0, step = 0, maxStep = 1000, animate = false, turns = 1, showCircles = true, ratio = 1, animationSpeed = 1, isAnimationLoop = false
pathDown = [], pathCenter = [], pathUp = [],  pathRight = [],  pathLeft = [],
drawUp = false, drawCenter = false, drawDown = true, drawRight = false, drawLeft = false,
colorBg = '#fffdc7', colorCircleA = '#ffc7c7', colorCircleB = '#c7eaff', colorCenterA = '#FF0000', colorCenterB = '#0000FF', 
colorPathDown = '#000000', colorPathCenter = '#000000', colorPathUp = '#000000', colorPathLeft = '#000000', colorPathRight = '#000000'

function setup_() {
    R = min(width, height) / 8
    r = R
    circleA = createVector(0, 0)
    computePaths()
}

function computePaths() {
    pathDown = [], pathCenter = [], pathUp = [], pathRight = [], pathLeft = []
    for(let i = 0; i <= maxStep; i++) {
        const angle_ = map(i, 0, maxStep, 0, turns * TWO_PI)
        const angleB_ = angle_ * R/r
        const circleB_ = createVector(0, R+r).setHeading(HALF_PI - angle_)
        const BA = Vector.sub(circleA, circleB_).setMag(r)
        pathDown.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_)))
        pathUp.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_ + PI)))
        pathRight.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_ + HALF_PI)))
        pathLeft.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_ - HALF_PI)))
        pathCenter.push(circleB_)
    }
}

function draw_() {
    update()
    background(colorBg)
    translate(width/2, height/2)
    scale(1, -1)
    if(showCircles) {
        drawCircleA()
        drawCircleB()
        drawDetails()
    }
    drawPaths()
}

function update() {
    computePaths()
    if(animate) {
        step += 2 * animationSpeed
        if(step >= maxStep) {
            if(!isAnimationLoop) {
                step = maxStep
                animate = false
            }
            else step = 0
        }
    }
    angle = map(step, 0, maxStep, 0, turns * TWO_PI)
    angleB = angle * R/r
    circleB = createVector(0, R+r).setHeading(HALF_PI - angle)
}

function drawPaths() {
    push()
    for(let i = 1; i <= step; i++) {
        if(drawUp) {
            stroke(colorPathUp)
            line(pathUp[i-1].x, pathUp[i-1].y, pathUp[i].x, pathUp[i].y)
        }
        if(drawCenter) {
            stroke(colorPathCenter)
            line(pathCenter[i-1].x, pathCenter[i-1].y, pathCenter[i].x, pathCenter[i].y)
        }
        if(drawDown) {
            stroke(colorPathDown)
            line(pathDown[i-1].x, pathDown[i-1].y, pathDown[i].x, pathDown[i].y)
        }
        if(drawLeft) {
            stroke(colorPathLeft)
            line(pathLeft[i-1].x, pathLeft[i-1].y, pathLeft[i].x, pathLeft[i].y)
        }
        if(drawRight) {
            stroke(colorPathRight)
            line(pathRight[i-1].x, pathRight[i-1].y, pathRight[i].x, pathRight[i].y)
        }
    }
    pop()
}

function drawCircleA() {
    fill(colorCircleA)
    circle(circleA.x, circleA.y, R*2)
}

function drawCircleB() {
    fill(colorCircleB)
    circle(circleB.x, circleB.y, r*2)
}

function drawDetails() {
    const BA = Vector.sub(circleA, circleB).setMag(r)
    if(drawDown)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB))
    if(drawUp)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB + PI))
    if(drawRight)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB + HALF_PI))
    if(drawLeft)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB - HALF_PI))
    if(drawCenter)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB))
    fill(colorCenterA)
    circle(circleA.x, circleA.y, R/14)
    fill(colorCenterB)
    circle(circleB.x, circleB.y, r/14)
}

function drawLinePointVector(p, v) {
    line(p.x, p.y, p.x + v.x, p.y + v.y)
}
