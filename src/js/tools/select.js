function startSelect() {
    resetAllTools();
    tools.select.active = true;
}

function handleSelect() {
    if (tools.select.object === undefined) {
        tools.select.object = new createjs.Shape();
        tools.select.object.graphics.beginFill('rgba(0, 255, 0, .2)').beginStroke("#00FF00");
        tools.select.object.graphics.setStrokeStyle(2, 0, 1);
        tools.select.object.graphics.drawRect(stage.mouse.x, stage.mouse.y, 1, 1);
        tools.select.object.graphics.endFill();
        tools.select.originalPoints = { x: stage.mouse.x, y: stage.mouse.y };
        stage.addChild(tools.select.object);
    }

    tools.select.object.graphics.clear().beginFill('rgba(0, 255, 0, .2)').beginStroke("#00FF00").drawRect();
    tools.select.object.graphics.setStrokeStyle(2, 0, 1);

    var diffx = stage.mouse.x - tools.select.originalPoints.x;
    var diffy = stage.mouse.y - tools.select.originalPoints.y;

    tools.select.object.graphics.drawRect(tools.select.originalPoints.x, tools.select.originalPoints.y, diffx, diffy);
    tools.select.diff = { x: diffx, y: diffy };
    stage.update();
}

function stopSelect() {
    if (tools.select.object) {
        tools.select.object.graphics.clear();
    }

    var bb;
    if (tools.select.originalPoints) {
        bb = {
            ix: tools.select.originalPoints.x,
            iy: tools.select.originalPoints.y,
            ax: tools.select.originalPoints.x + tools.select.diff.x,
            ay: tools.select.originalPoints.y + tools.select.diff.y
        }
    }

    for (var p = 0; p < points.length; p++) {
        var point = points[p];
        point.diffSelect = undefined;

        if (bb) {
            if (bb.ix <= point.x && point.x <= bb.ax && bb.iy <= point.y && point.y <= bb.ay) {
                point.graphics.command.radius = 8;
                point.isSelected = true;
            }
            else {
                point.graphics.command.radius = 2;
                point.isSelected = false;
            }
        }
    }

    tools.select.object = undefined;

    console.log(points);

    stage.update();

    // tools.select.active = false;
}