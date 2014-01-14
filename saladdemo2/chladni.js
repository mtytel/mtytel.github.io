/**
 * Salad: javascript waves, resonance and Chladni figures.
 *
 * Copyright (c) 2013
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

var chladni = function() {
  // Damping consistently puts friction on all waving points.
  var DAMPING = 1.0;
  // Speed constant somehow defines speed of waves. Not sure on relationship.
  var SPEED_CONSTANT = 1.0;

  // Store the width and height so we don't have to access the DOM later.
  var canvas_width = 0, canvas_height = 0;
  var context = null;
  var image = null;
  var pos_matrix_r = null;
  var pos_matrix_g = null;
  var pos_matrix_b = null;
  var vel_matrix_r = null;
  var vel_matrix_g = null;
  var vel_matrix_b = null;
  var temp_matrix_r = null;
  var temp_matrix_g = null;
  var temp_matrix_b = null;
  var time = 0;

  // Index by row first, then column.
  function createTwoDimArray(width, height) {
    var arr = [];
    for (var r = 0; r < height; r++) {
      var row = [];
      for (var c = 0; c < width; c++) {
        row.push(0);
      }
      arr.push(row);
    }
    return arr;
  }

  function tick() {
    // Update the input equation.
    var val_r = 5.0 * Math.sin(time / 8.0);
    for (var i = 0; i < canvas_width; i++) {
      pos_matrix_r[0][i] = val_r;
      pos_matrix_r[canvas_height - 1][i] = val_r;
    }
    for (var i = 0; i < canvas_height; i++) {
      pos_matrix_r[i][0] = val_r;
      pos_matrix_r[i][canvas_width - 1] = val_r;
    }

    var val_g = 5.0 * Math.sin(time / 7.98);
    for (var i = 0; i < canvas_width; i++) {
      pos_matrix_g[0][i] = val_g;
      pos_matrix_g[canvas_height - 1][i] = val_g;
    }
    for (var i = 0; i < canvas_height; i++) {
      pos_matrix_g[i][0] = val_g;
      pos_matrix_g[i][canvas_width - 1] = val_g;
    }

    var val_b = 5.0 * Math.sin(time / 8.02);
    for (var i = 0; i < canvas_width; i++) {
      pos_matrix_b[0][i] = val_b;
      pos_matrix_b[canvas_height - 1][i] = val_b;
    }
    for (var i = 0; i < canvas_height; i++) {
      pos_matrix_b[i][0] = val_b;
      pos_matrix_b[i][canvas_width - 1] = val_b;
    }
    time++;

    // Wave equation! Give an acceleration based on neighboring points.
    for (var r = 1; r < canvas_height - 1; r++) {
      for (var c = 1; c < canvas_width - 1; c++) {
        var neighbor_sum = pos_matrix_r[r - 1][c] + pos_matrix_r[r + 1][c] +
                           pos_matrix_r[r][c - 1] + pos_matrix_r[r][c + 1];
        var difference = pos_matrix_r[r][c] - neighbor_sum / 4.0;
        temp_matrix_r[r][c] = vel_matrix_r[r][c] - SPEED_CONSTANT * difference;
      }
    }
    // Swap the velocity matrices.
    var temp = vel_matrix_r;
    vel_matrix_r = temp_matrix_r;
    temp_matrix_r = vel_matrix_r;

    // Wave equation! Give an acceleration based on neighboring points.
    for (var r = 1; r < canvas_height - 1; r++) {
      for (var c = 1; c < canvas_width - 1; c++) {
        var neighbor_sum = pos_matrix_g[r - 1][c] + pos_matrix_g[r + 1][c] +
                           pos_matrix_g[r][c - 1] + pos_matrix_g[r][c + 1];
        var difference = pos_matrix_g[r][c] - neighbor_sum / 4.0;
        temp_matrix_g[r][c] = vel_matrix_g[r][c] - SPEED_CONSTANT * difference;
      }
    }
    // Swap the velocity matrices.
    var temp = vel_matrix_g;
    vel_matrix_g = temp_matrix_g;
    temp_matrix_g = vel_matrix_g;

    // Wave equation! Give an acceleration based on neighboring points.
    for (var r = 1; r < canvas_height - 1; r++) {
      for (var c = 1; c < canvas_width - 1; c++) {
        var neighbor_sum = pos_matrix_b[r - 1][c] + pos_matrix_b[r + 1][c] +
                           pos_matrix_b[r][c - 1] + pos_matrix_b[r][c + 1];
        var difference = pos_matrix_b[r][c] - neighbor_sum / 4.0;
        temp_matrix_b[r][c] = vel_matrix_b[r][c] - SPEED_CONSTANT * difference;
      }
    }
    // Swap the velocity matrices.
    var temp = vel_matrix_b;
    vel_matrix_b = temp_matrix_b;
    temp_matrix_b = vel_matrix_b;

    for (var r = 1; r < canvas_height - 1; r++) {
      for (var c = 1; c < canvas_width - 1; c++) {
        // Damp the velocity for each point.
        vel_matrix_r[r][c] *= DAMPING;
        vel_matrix_g[r][c] *= DAMPING;
        vel_matrix_b[r][c] *= DAMPING;

        // Update the position for each point.
        pos_matrix_r[r][c] += vel_matrix_r[r][c];
        pos_matrix_g[r][c] += vel_matrix_g[r][c];
        pos_matrix_b[r][c] += vel_matrix_b[r][c];

        // Update the image so it's ready to draw if we need.
        var index = 4 * (r * canvas_width + c);
        image.data[index] = Math.max(0, Math.min(255, Math.floor(pos_matrix_r[r][c] * 20)));
        image.data[index + 1] = Math.max(0, Math.min(255, Math.floor(pos_matrix_b[r][c] * 20)));
        image.data[index + 2] = Math.max(0, Math.min(255, Math.floor(pos_matrix_g[r][c] * 20)));
        image.data[index + 3] = 255;
      }
    }
  }

  function draw() {
    context.putImageData(image, 0, 0);
    window.requestAnimationFrame(draw);
  }

  function init() {
    var canvas = document.getElementById('chladni');
    context = canvas.getContext('2d');
    canvas_width = canvas.width;
    canvas_height = canvas.height;
    image = context.createImageData(canvas_width, canvas_height);
    pos_matrix_r = createTwoDimArray(canvas_width, canvas_height);
    pos_matrix_g = createTwoDimArray(canvas_width, canvas_height);
    pos_matrix_b = createTwoDimArray(canvas_width, canvas_height);
    vel_matrix_r = createTwoDimArray(canvas_width, canvas_height);
    vel_matrix_g = createTwoDimArray(canvas_width, canvas_height);
    vel_matrix_b = createTwoDimArray(canvas_width, canvas_height);
    temp_matrix_r = createTwoDimArray(canvas_width, canvas_height);
    temp_matrix_g = createTwoDimArray(canvas_width, canvas_height);
    temp_matrix_b = createTwoDimArray(canvas_width, canvas_height);
    time = 0;

    setInterval(tick, 20);
    draw();
  }

  return {
    init: init,
    draw: draw,
    tick: tick,
  };
}();

window.onload = chladni.init;
