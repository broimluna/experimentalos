<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="description" content="Live interactive cross-browser testing in all web browsers - Internet Explorer, Firefox, Chrome, Safari, and Opera.">

    <link rel="stylesheet" type="text/css" href="https://browserling.com/css/reset.css">
    <link rel="stylesheet" type="text/css" href="https://Remote-Desktop.unzor.repl.co/style.css">
    <link rel="stylesheet" type="text/css" href="https://browserling.com/css/style-canvas-editor.css?v=f6cf85">

          <script>
        var session = {
          plan : "team"
        };
      </script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.11/jquery.mousewheel.min.js"></script>
    <script src="https://browserling.com/js/socket.io.1.4.7.js"></script>

    <script src="https://browserling.com/js/queue.js?v=f6cf85"></script>
    <script src="https://browserling.com/js/browser_display.js?v=f6cf85"></script>
    <script src="https://browserling.com/js/browse.js?v=f6cf85"></script>
    <script src="https://browserling.com/js/keyboard.js?v=f6cf85"></script>
    <script src="https://browserling.com/js/canvas-editor.js?v=f6cf85"></script>

    <script>
      var is_ie8_unique_variable_xyzzy = false;
    </script>
    <!--[if IE 8]>
    <script>
      var is_ie8_unique_variable_xyzzy = true; 
    </script>
    <![endif]-->

    <script>
      var is_ie9_unique_variable_xyzzy = false;
    </script>
    <!--[if IE 9]>
    <script>
      var is_ie9_unique_variable_xyzzy = true; 
    </script>
    <![endif]-->

    <script>
      function isCanvasSupported () {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext && canvas.getContext('2d');
        return !!context;
      }

      function isWebpSupported () {
        if (!isCanvasSupported()) {
          return false;
        }
        var canvas = document.createElement('canvas');
        var supportsWebp = canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0;

        // chrome older or equal to 21 don't support webp well
        if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
            && window.chrome)
        {
          var m = navigator.userAgent.match(/Chrome\/(\d+)/);
          if (m) {
            var chromeVersion = parseInt(m[1], 10);
            if (chromeVersion <= 21) {
              return false;
            }
          }
        }

        return supportsWebp;
      }

      var browserCapabilities = {
        canvas : isCanvasSupported(),
        webp : isWebpSupported(),
        ie8 : is_ie8_unique_variable_xyzzy,
        ie9 : is_ie9_unique_variable_xyzzy
      };
    </script>
  </head>

  <body>
    <div style="display:none;" id="header">
      <div class="float-fix-a">
        <div class="float-fix-b">
                    <div id="timer">
            03:00
          </div>
                    <div id="url">
            <input type="text" value="chrome://newtab">
          </div>
          <div id="browser">
                          <img src="https://browserling.com/images/browser-icons/chrome.png">
              <span id="current-browser-version">55</span>
                      </div>
          <div id="run">
            <input type="button" value="Run">
            <input type="hidden" name="platform_name" value="win">
            <input type="hidden" name="platform_version" value="10"><input type="hidden" name="browser" value="chrome">
            <input type="hidden" name="version" value="56">
          </div>
          <div id="keyboard">
            <a href="#" title="On-Screen Keyboard"><img src="https://browserling.com/images/keyboard.png"></a>
          </div>
          <div id="bug-hunter">
            <a href="#" title="Bug Hunter"><img src="https://browserling.com/images/bug-hunter.png"></a>
          </div>
          <div id="tools">
            <input type="button" value="Tools">
          </div>
          <div id="done">
            <input type="button" value="End Session">
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>

    
          <div style="display:none;" id="paid-plan-message">
        <p>The free plan lets you access Windows 7 and Android 7.1 only.</p>
        <p>You requested CHROME version 10 on Windows XP but you'll get Chrome 55 on Windows 7.</p>
        <p>Upgrade to the <a href="https://browserling.com/#pricing">paid plan</a> to access all platforms and all browsers!</p>
      </div>
    
    <div id="bug-hunter-tools">
      <div id="bug-hunter-what-is">
        Bug hunter lets you quickly pinpoint and report design issues on your website!
      </div>
      <div id="bug-hunter-not-connected">
        Please wait until you connect to a browser before using Bug Hunter.
      </div>
      <div id="canvas-editor-menu"></div>

      <div id="bug-hunter-send-email">
        <div>
          Send your annotation to this email:
        </div>
        <div>
          <input type="input" name="bug-hunter-email">
        </div>
        <div class="">
          Extra message (optional):
        </div>
        <div>
          <textarea name="bug-hunter-message-email"></textarea>
        </div>
        <div class="bug-hunter-error"></div>
        <div class="bug-hunter-success"></div>
        <div id="email-the-bug-hunt">
          <input type="submit" value="Email the bug hunt!">
        </div>
      </div>

      <div id="bug-hunter-send-imgur">
        <div class="">
          Extra message (optional):
        </div>
        <div>
          <textarea name="bug-hunter-message-imgur"></textarea>
        </div>
        <div class="bug-hunter-error"></div>
        <div class="bug-hunter-success"></div>
        <div id="bug-hunter-imgur-links">
          <div>Link to picture: <a href=""></a> <input type="text" name="imgur-img-link"></div>
          <div>Delete link: <input type="text" name="imgur-del-link"></div>
          <div>Markdown embed: <input type="text" name="imgur-markdown"></div>
        </div>
        <div id="imgur-the-bug-hunt">
          <input type="submit" value="Upload to Imgur!">
        </div>
      </div>
    </div>

          <div id="queue">
        <div id="queue-status">
          Connecting...
        </div>
        <div id="queue-error">
          <div id="queue-error-text"></div>
          <div style="display: none;" id="queue-contact-support">Please <a href="https://browserling.com/support">contact support</a>.</div>
        </div>
                  <div id="queue-length">
            You're in position <span class="queue-position">x</span> out of <span class="queue-length">y</span>.
          </div>
          <div id="queue-wait-time">
            Estimated wait time <span class="queue-wait-time">3</span> minutes</span>.
          </div>
          <div style="display:none;" id="queue-skip">
            <p class="plan">Tired of waiting? <a href="https://browserling.com/#pricing" id="queue-skip-get-plan">Get the developer plan</a> and skip the queue!</p>
            <p class="what">(The paid plan includes all Internet Explorer versions, SSH tunnels, screenshots, bug hunter, and resolution changing.)</p>
          </div>
              </div>
    
    <div style="cursor: none;" id="display">
    </div>

    <script>
      var login_or_paid_plan = 0;
      if (navigator.userAgent) {
        var match = navigator.userAgent.match(/Chrome\/(\d+)/);
        if (match) {
          if (!/Edge\//.test(navigator.userAgent)) {
            var ua_browser = 'chrome';
            var ua_version = match[1];
          }
        }
      }
    </script>

    <div id="times-up">
      <div id="times-up-top">Time's up!</div>
      <div id="times-up-message-1">
        <p>Your browsing time is up! The free plan lets you have just 3 minute sessions.</p>
        <p>If you want the timer to go away, upgrade to the paid plan!</p>
      </div>
      <div id="times-up-upgrade">
        <input type="button" name="upgrade" value="Upgrade">
      </div>
      <div id="times-up-message-2">
        <p>Paid plans unlock premium browsers such as Internet Explorer 6, 7, 8, 10, 11, and it also includes SSH tunnels, resolution changing, screenshots, bug hunter and premium support.</p>
      </div>
    </div>

    <div id="idle-timeout">
      <div id="idle-timeout-top">Idle Timeout</div>
      <div id="idle-timeout-message-1">
        <p>Your session was closed because of 2 hour inactivity.</p>
      </div>
    </div>

    <div id="disconnected">
      <div id="disconnected-top">Disconnected</div>
      <div id="disconnected-message-1">
        <p>Whoops, something went wrong...</p>
        <p>Reload the page to try again, and if it still doesn't work, please contact <a href="https://browserling.com/support">support</a>.</p>
      </div>
    </div>

    <div id="limit-reached">
      <div id="limit-reached-top">Free usage limit reached</div>
      <div id="limit-reached-message-1">
        <p>You've reached the daily free plan limit. The free plan lets you use the service only a few times per day.</p>
      </div>
      <div id="limit-reached-message-2">
        <p>Upgrade to the <a href="/https://browserling.com#pricing">paid plan</a> to skip this limit!</p>
      </div>
      <div id="limit-reached-upgrade">
        <input type="button" name="upgrade" value="Upgrade now!">
      </div>
      <div id="limit-reached-message-3">
        <p>The paid plan includes all Internet Explorer versions, SSH tunnels, resolution changing, screenshots and premium support.</p>
      </div>
    </div>

    
    <script>
      var connected = false;
      var bugHunterActive = false;
      var disconnectedWhileBugHunting = false;
      var sessionTimeout = false;
      var timer; // rename to "planTimer"
      var canvasEditor, canvasEditorMenu;
      var element = display.element
          .css('margin', 'auto')
          .attr('tabindex', 0) // so the div can receive focus

      if (platform_name == "android") {
        element
          .width(480)
          .height(800);
      }
      else {
        element
          .width(1024)
          .height(768);
      }
      display.canvas.oncontextmenu = function () { return false; } // do nothing on right click
      $('#display').append(element);

      function timesUp () {
        sessionTimeout = true;
        if (bugHunterActive) return; // display time's up message after closing bug hunter
        $('#times-up').fadeIn();
      }

      function disconnect () {
          if ($('#idle-timeout').is(':visible')) return;
          if ($('#times-up').is(':visible')) return;
          if ($('#limit-reached').is(':visible')) return;
          if (bugHunterActive) {
            // if we disconnect and bug hunter is active,
            // display the disconnected message only after bug hunter has been closed
            disconnectedWhileBugHunting = false;
          }
          else {
            $('#disconnected').fadeIn();
          }
          if (timer) clearInterval(timer);
      }

      var connectingTimer;
      function queueConnected (queueLength) {
        clearInterval(connectingTimer);
        if (session.plan === "free")
          $('#queue-status').text("Waiting in queue...");
        else
          $('#queue-status').text("Connecting to the browser...");
      }

      function queueDisconnected () {
          $('#queue-status').text("Disconnected");
      }

      function queueInvalidNew (reason) {
        $('#queue-error').show();
        $('#queue-error-text').text(reason);
      }

      function queueFreeLimit () {
        $('#queue').hide();
        $('#limit-reached').fadeIn();
      }

      function queueNext () {
          var currPos = $('#queue-length span.queue-position').text();
          currPos--;
          $('#queue-length span.queue-position').text(currPos);
          if (totalServers == 0) {
            // todo: queueLength undefined
            $('#queue-wait-time span.queue-wait-time').text(parseInt(queueLength * 3,10));
          }
          else {
            $('#queue-wait-time span.queue-wait-time').text(parseInt(currPos * 3/totalServers,10));
          }
      }

      function queueDecLength () {
          var currLen = $('#queue-length span.queue-length').text();
          currLen--;
          $('#queue-length span.queue-length').text(currLen);
      }

      function queueIncLength () {
          var currLen = $('#queue-length span.queue-length').text();
          currLen++;
          $('#queue-length span.queue-length').text(currLen);
      }

      var totalServers;
      function queueStart (queueLength, serverCount) {
          totalServers = serverCount;
          $('#queue-length span.queue-position').text(queueLength);
          $('#queue-length span.queue-length').text(queueLength);
          $('#queue-length').fadeIn();

          if (serverCount == 0) {
            $('#queue-wait-time span.queue-wait-time').text(parseInt(queueLength * 3,10));
          }
          else {
            $('#queue-wait-time span.queue-wait-time').text(parseInt(queueLength * 3/serverCount,10));
          }
          $('#queue-wait-time').fadeIn();
      }

      var socket;
      var availableBrowsers = {};
      function queueYourTurn (job) {
        if (session.plan == "free") {
          try {
            var audio = $('<audio id="sound-start" src="https://browserling.com/media/start.mp3"></audio>');
            $('body').append(audio);
            $('#sound-start')[0].play();
          }
          catch (err) { }
        }
        
        queue.disconnect();

        if (session.plan == "free") {
          $('#queue-status').text("Your turn is coming up!")
        }
        else {
          $('#queue-status').text("Your browser is coming up!")
        }

        var encoderUrl;
        var encoder = job.encoder;
        if (encoder == "192.168.1.5") {
          encoderUrl = "http://192.168.1.5:3000";
        }
        else if (encoder == "127.0.0.1") {
          encoderUrl = "http://127.0.0.1:3000";
        }
        else if (encoder == "localhost") {
          encoderUrl = "http://localhost:3000";
        }
        else {
          var dashEncoder = encoder.replace(/\./g,'-')
          encoderUrl = "https://encoder-" + dashEncoder + ".browserling.com";
        }

        socket = io(
          encoderUrl,
          {
            reconnection : false
          }
        );

        socket.on('connect', function () {
          if (job.multiplexPort) {
            socket.emit('multiplexPort', job.multiplexPort);
          }
          else {
            socket.emit('confirmId', job.id, ua_browser, ua_version, browserCapabilities)
          }
        });

        socket.on('confirmedMultiplexPort', function () {
          socket.emit('confirmId', job.id, ua_browser, ua_version, browserCapabilities);
        });

        socket.on('confirmedId', function () {
          connected = true;

          if (bugHunterActive) {
            $('#bug-hunter-not-connected').fadeOut();
            canvasEditor.attach(display.canvas);
          }

          var platform_name = $('#run input[name="platform_name"]').val();
          var platform_version = $('#run input[name="platform_version"]').val();
          var browser = $('#run input[name="browser"]').val();
          var version = $('#run input[name="version"]').val();
          var url = $('#url input').val();

          socket.emit('navigate', browser, version, url);

          $('#queue').fadeOut(function () {
            $('#display').fadeIn();
          });

          var mouseMask = 0;
          var shiftMask = 0;

          var idleTimeoutTimer;
          function resetIdleTimeoutTimer () {
            clearTimeout(idleTimeoutTimer);
            idleTimeoutTimer = setTimeout(function () {
              if (connected) {
                $('#idle-timeout').show();
                socket.disconnect();
              }
            }, 2 * 3600 * 1000);
          }
          resetIdleTimeoutTimer();

          element
              .mousemove(function (ev) {
                  if (connected && !bugHunterActive) {
                    //display.element.focus();
                    var pos = calcMousePos(ev);
                    socket.emit('sendPointer', {
                      x : pos.x,
                      y : pos.y,
                      mouseMask : mouseMask
                    });
                  }
                  resetIdleTimeoutTimer();
              })
              .mousedown(function (ev) {
                  if (ev.which == 1) {
                    // left click
                    mouseMask = 1;
                  }
                  else if (ev.which == 2) {
                    // middle click
                    mouseMask = 2;
                  }
                  else if (ev.which == 3) {
                    // right click
                    mouseMask = 4;
                  }
                  else {
                    mouseMask = 1;
                  }
                  if (connected && !bugHunterActive) {
                    var pos = calcMousePos(ev);
                    socket.emit('sendPointer', {
                          x : pos.x,
                          y : pos.y,
                          mouseMask : mouseMask
                    });
                    resetIdleTimeoutTimer();
                  }
                  ev.preventDefault();
              })
              .mouseup(function (ev) {
                  mouseMask = 0;
                  if (connected && !bugHunterActive) {
                    var pos = calcMousePos(ev);
                    socket.emit('sendPointer', {
                          x : pos.x,
                          y : pos.y,
                          mouseMask : mouseMask
                    });
                    resetIdleTimeoutTimer();
                  }
                  ev.preventDefault();
              })
              .mousewheel(function (ev, delta) {
                  var pos = calcMousePos(ev);
                  if (connected && !bugHunterActive) {
                    if (delta > 0) { // mouse up
                        socket.emit('sendPointer', {
                              x : pos.x,
                              y : pos.y,
                              mouseMask : 1 << 3
                        });
                        socket.emit('sendPointer', {
                              x : pos.x,
                              y : pos.y,
                              mouseMask : 0
                        });
                        resetIdleTimeoutTimer();
                    }
                    else {
                        socket.emit('sendPointer', {
                              x : pos.x,
                              y : pos.y,
                              mouseMask : 1 << 4
                        });
                        socket.emit('sendPointer', {
                              x : pos.x,
                              y : pos.y,
                              mouseMask : 0
                        });
                        resetIdleTimeoutTimer();
                    }
                  }
                  ev.preventDefault();
              })
          ;
          if (platform_name == "android") {
            display.resize({width:480,height:800});
          }
          else {
            display.resize({width:1024,height:768});
          }

          var lastDownTarget;
          $(document).mousemove(function (ev) {
            lastDownTarget = ev.target;
          });

          $(document)
              .keydown(function (ev) {
                  if (lastDownTarget === display.canvas) {
                    if (ev.keyCode == 16) { shiftMask = 1 }

                    if (connected && !bugHunterActive) {
                      socket.emit('sendKeyDown', {
                          keyCode : ev.keyCode,
                          shiftMask : shiftMask
                      });
                      resetIdleTimeoutTimer();
                    }
                    ev.preventDefault();
                  }
              })
              .keyup(function (ev) {
                  if (lastDownTarget === display.canvas) {
                    if (ev.keyCode == 16) { shiftMask = 0 }
                    
                    if (connected && !bugHunterActive) {
                      socket.emit('sendKeyUp', {
                          keyCode : ev.keyCode,
                          shiftMask : shiftMask
                      });
                      resetIdleTimeoutTimer();
                    }
                    ev.preventDefault();
                  }
              })
        });

        socket.on('disconnect', function () {
          disconnect();
        });

        socket.on('screenUpdate', function (update) {
          display.rawRect(update);
        });

        socket.on('copyRect', function (rect) {
          display.copyRect(rect);
        });

        socket.on('screenSize', function (size) {
          display.resize(size);
        });

        socket.on('browserList', function (browsers) {
          availableBrowsers = {};
          for (var i = 0; i < browsers.length; i++) {
            availableBrowsers[browsers[i]] = true;
          }
        });

        socket.on('timeout', function () {
          timesUp();
        });

        if (session.plan == "free") {
            var i = 1;
            var freePlanTime = job.timeout || 3*60*1000;
            timer = setInterval(function () {
                var min = parseInt(( freePlanTime/1000 - i ) / 60, 10);
                var sec = parseInt(( freePlanTime/1000 - i ) % 60, 10);
                if (min<10) min = "0" + min;
                if (sec<10) sec = "0" + sec;
                $('#timer').text(min + ":" + sec);
                i++;

                if (min == 0 && sec == 0) {
                    clearInterval(timer);
                    timesUp();
                    if (connected) {
                        socket.disconnect();
                    }
                }
            }, 1000);
        }
      }

      var platform_name = $('#run input[name="platform_name"]').val();
      var platform_version = $('#run input[name="platform_version"]').val();
      var browser = $('#run input[name="browser"]').val();
      var version = $('#run input[name="version"]').val();
      var url = $('#url input').val();

      var queueUrl = 'https://queue2.browserling.com';
      if (/192.168.1/.test(window.location.href)) {
        queueUrl = 'http://192.168.1.2:7500';
      }
      else if (/127.0.0.1/.test(window.location.href)) {
        queueUrl = 'http://127.0.0.1:7500';
      }
      else if (/localhost/.test(window.location.href)) {
        queueUrl = 'http://127.0.0.1:7500';
      }
      if (/127.0.0.1/.test(window.location.href)) {
        queueUrl = 'http://127.0.0.1:7500'
      }
      if (/localhost/.test(window.location.href)) {
        queueUrl = 'http://127.0.0.1:7500'
      }

      if (!login_or_paid_plan) {
        var queue = new Queue(
          queueUrl,
          {
            email : session.email,
            plan : session.plan,
            browser : browser,
            version : version,
            platform_name : platform_name,
            platform_version : platform_version,
            url : url
          },
          {
            connected : queueConnected,
            disconnected : queueDisconnected,
            next : queueNext,
            decQueueLength : queueDecLength,
            incQueueLength : queueIncLength,
            start : queueStart,
            invalidNew : queueInvalidNew,
            freeLimit : queueFreeLimit,
            yourTurn : queueYourTurn
          }
        );

        browseRequest(platform_name, platform_version, browser, version, url);
      }

      function calcMousePos (ev) {
        /*
          var scale = {
              x : self.size.width / self.element.width(),
              y : self.size.height / self.element.height()
          };
          var x = ev.pageX - self.element.offset().left;
          var y = ev.pageY - self.element.offset().top;
          return { x : x * scale.x, y : y * scale.y };
        */
        return {
          x : ev.pageX - element.offset().left - 2,
          y : ev.pageY - element.offset().top - 2
        };
      }
    </script>
    

    <div id="keyboard-menu">
      <div id="keyboard-menu-inner">
        <div id="keyboard-menu-keyboard">
          <div class="row row1">
            <span class="key esc">ESC</span>
            <span class="key f1">F1</span>
            <span class="key f2">F2</span>
            <span class="key f3">F3</span>
            <span class="key f4">F4</span>
            <span class="key f5">F5</span>
            <span class="key f6">F6</span>
            <span class="key f7">F8</span>
            <span class="key f8">F9</span>
            <span class="key f9">F10</span>
            <span class="key f10">F11</span>
            <span class="key f10">F12</span>
          </div>
          <div class="row row2">
            <span class="key">`</span>
            <span class="key">1</span>
            <span class="key">2</span>
            <span class="key">3</span>
            <span class="key">4</span>
            <span class="key">5</span>
            <span class="key">6</span>
            <span class="key">7</span>
            <span class="key">8</span>
            <span class="key">9</span>
            <span class="key">0</span>
            <span class="key">-</span>
            <span class="key">=</span>
            <span class="key backspace">Backsp</span>
          </div>
          <div class="row row3">
            <span class="key">TAB</span>
            <span class="key">q</span>
            <span class="key">w</span>
            <span class="key">e</span>
            <span class="key">r</span>
            <span class="key">t</span>
            <span class="key">y</span>
            <span class="key">u</span>
            <span class="key">i</span>
            <span class="key">o</span>
            <span class="key">p</span>
            <span class="key">[</span>
            <span class="key">]</span>
            <span class="key backslash">\</span>
          </div>
          <div class="row row4">
            <span class="key caps">Caps</span>
            <span class="key">a</span>
            <span class="key">s</span>
            <span class="key">d</span>
            <span class="key">f</span>
            <span class="key">g</span>
            <span class="key">h</span>
            <span class="key">j</span>
            <span class="key">k</span>
            <span class="key">l</span>
            <span class="key">;</span>
            <span class="key">'</span>
            <span class="key enter">Enter</span>
          </div>
          <div class="row row5">
            <span class="key shift">Shift</span>
            <span class="key">z</span>
            <span class="key">x</span>
            <span class="key">c</span>
            <span class="key">v</span>
            <span class="key">b</span>
            <span class="key">n</span>
            <span class="key">m</span>
            <span class="key">,</span>
            <span class="key">.</span>
            <span class="key">/</span>
            <span class="key shift">Shift</span>
          </div>
          <div class="row row6">
            <span class="key ctrl">Ctrl</span>
            <span class="key winkey">WinKey</span>
            <span class="key alt">Alt</span>
            <span class="key space">Space</span>
            <span class="key ctrl">Alt</span>
            <span class="key winkey">OptKey</span>
            <span class="key alt">Ctrl</span>
          </div>    
        </div>
      </div>
    </div>

    <div id="tools-menu">
      <div id="tools-menu-inner">
        <div id="tools-menu-close"><a href="#">X</a></div>
        <div class="tool-item"><img src="https://browserling.com/images/tools-icons/tunnels.png"><a class="link" href="#" id="tools-ssh">Local Testing (SSH Tunnels)</a></div>
        <div class="tool-item"><img src="https://browserling.com/images/tools-icons/resolution.png"><a class="link" href="#" id="tools-resol">Resolution Changing</a></div>
        <div class="tool-item"><img src="https://browserling.com/images/tools-icons/screenshots.png"><a class="link" href="#" id="tools-screenshots">Screenshots</a></div>
        <div class="tool-item"><img src="/images/tools-icons/share.png"><a class="link" href="#" id="tools-shareurl">Share browser (URL to browser)</a></div>
        <div class="tool-item tool-item-last"><img src="/images/tools-icons/feedback.png"><a class="link" href="#" id="tools-feedback">Leave Feedback</a></div>
      </div>
    </div>

    <div id="screenshots-menu">
      <div id="screenshots-menu-inner">
        <div id="screenshots-menu-close">
          <a href="#">X</a>
        </div>
        <div class="menu-title">
          Screenshots
        </div>
        <div class="menu-content">
          <form>
            <div id="screenshots-left">
              <div id="screenshots-screenshot">
                <div id="screenshots-screenshot-not-connected">
                  Not connected to a browser.
                </div>
              </div>
              <div id="screenshots-refresh">
                <input type="button" value="Refresh" name="refresh">
              </div>
            </div>
            <div id="screenshots-right">
              <div id="screenshots-title">
                <div>Screenshot title:</div> 
                <div><input type="text" name="title"></div>
              </div>
              <div id="screenshots-desc">
                <div>Screenshot description:</div> 
                <div>
                  <textarea name="desc"></textarea>
                </div>
              </div>
              <div id="screenshots-buttons">
                                  <p>You need a developer plan to save screenshots.</p>
                  <p><a href="/#pricing">Upgrade!</a></p>
                              </div>
            </div>
            <div class="clear"></div>
          </form>
        </div>
      </div>
    </div>

    <div id="shareurl-menu">
      <div id="shareurl-menu-inner">
        <div id="shareurl-menu-close">
          <a href="#">X</a>
        </div>
        <div class="menu-title">
          Quick browser sharing URL
        </div>
        <div class="menu-content">
          <form>
            <div>
              Here's the URL to your browser:
            </div>
            <div>
              <input type="text" name="shareurl" size="38" id="shareurl" value="">
              <input type="checkbox" name="shorturl" id="shorturl"><label for="shorturl">Shorten URL</label>
            </div>
            <div id="shareurl-uniqname">
            </div>
            <div id="shareurl-error"></div>
          </form>
        </div>
      </div>
    </div>

    <div id="feedback-menu">
      <div id="feedback-menu-inner">
        <div id="feedback-menu-close">
          <a href="#">X</a>
        </div>
        <div class="menu-title">
          Leave feedback (service issues, feature requests, etc.)
        </div>
        <div class="menu-content">
          <form>
            <div>
              <label for="email">Email:</label>
              <input type="text" name="email" size="38" id="email" value="">
              <div class="clear"></div>
              <p id="anonymous">(Leave email empty to comment anonymously.)</p>
            </div>
            <div>
              <label for="message">Message:</label>
              <textarea name="message" rows="8" cols="38" id="message"></textarea>
              <div class="clear"></div>
            </div>
            <div id="feedback-error"></div>
            <div id="feedback-thanks"></div>
            <div id="send">
              <input type="button" value="Send!">
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="tunnel-menu">
      <div id="tunnel-menu-inner">
        <div id="tunnel-menu-close">
          <a href="#">X</a>
        </div>
        <div class="menu-title">
          Tunnel your localhost into Browserling with SSH
        </div>
        <div class="menu-content">
                  <div>
            SSH tunnels are only available to paying customers.
          </div>
          <div>
            <a href="/#pricing">Upgrade to the paid plan</a> to unlock SSH tunnels.
          </div>
                </div>
      </div>
    </div>

    <div id="resol-menu">
      <div id="resol-menu-inner">
        <div id="resol-menu-close">
          <a href="#">X</a>
        </div>
        <div class="menu-title">
          Change the screen resolution
        </div>
        <div class="menu-content">
                      <div>
              All resolutions are available only to paying customers.
            </div>
            <div>
              <a href="/#pricing">Upgrade to the paid plan</a> to unlock all resolutions.
            </div>
            <hr>
          </div>
                                <div class="list">
              <div class="aspect">4:3</div>
              <p>1600x1200</p>
              <p>1280x960</p>
              <p><a href="#" class="selected">1024x768</a></p>
              <p><a href="#">800x600</a></p>
            </div>
            <div class="list">
              <div class="aspect">16:9</div>
              <p>1920x1080</p>
              <p>1600x900</p>
              <p>1440x810</p>
              <p>1280x720</p>
            </div>
            <div class="list">
              <div class="aspect">16:10</div>
              <p>1920x1200</p>
              <p>1680x1050</p>
              <p>1440x900</p>
              <p>1280x800</p>
            </div>
            <div class="list">
              <div class="aspect">popular</div>
              <p>1366x768</p>
              <p>1280x1024</p>
              <p>768x1024</p>
              <p><a href="#">320x480</a></p>
            </div>
            <div class="clear"></div>
            <hr>
            <div id="resol-custom">
              Custom resolution:
              <input type="text" name="resol-custom-w" value="1024">
              x
              <input type="text" name="resol-custom-h" value="768">
              <input type="button" name="update" value="Update">
              <div>(Not available in the free plan.)</div>
            </div>
                  </div>
      </div>
    </div>

    <div id="browser-menu">
      <!-- operating systems menu -->
      <div id="platforms">
        <div id="platforms-row">
                                          <div class="platform" id="platform-winxp">
            <a href="#" id="winxp"><img src="/images/os-icons/windows-xp.png"></a>
          </div>
                                          <div class="platform" id="platform-winvista">
            <a href="#" id="winvista"><img src="/images/os-icons/windows-vista.png"></a>
          </div>
                                          <div class="platform selected" id="platform-win7">
            <a href="#" id="win7"><img src="/images/os-icons/windows-7.png"></a>
          </div>
                                          <div class="platform" id="platform-win8">
            <a href="#" id="win8"><img src="/images/os-icons/windows-8.png"></a>
          </div>
                                          <div class="platform" id="platform-win81">
            <a href="#" id="win81"><img src="/images/os-icons/windows-81.png"></a>
          </div>
                                          <div class="platform" id="platform-win10">
            <a href="#" id="win10"><img src="/images/os-icons/windows-10.png"></a>
          </div>

          <div class="platform" id="platform-all">
            <a href="#" id="allplatforms"><span>All browsers</span></a>
          </div>

          <div class="clear"></div>
        </div>

        <div id="platforms-row">
                                          <div class="platform" id="platform-android44">
            <a href="#" id="android44"><img src="/images/os-icons/android-44.png"></a>
          </div>
                                          <div class="platform" id="platform-android50">
            <a href="#" id="android50"><img src="/images/os-icons/android-50.png"></a>
          </div>
                                          <div class="platform" id="platform-android51">
            <a href="#" id="android51"><img src="/images/os-icons/android-51.png"></a>
          </div>
                                          <div class="platform" id="platform-android60">
            <a href="#" id="android60"><img src="/images/os-icons/android-60.png"></a>
          </div>
                                          <div class="platform" id="platform-android70">
            <a href="#" id="android70"><img src="/images/os-icons/android-70.png"></a>
          </div>
                                          <div class="platform" id="platform-android71">
            <a href="#" id="android71"><img src="/images/os-icons/android-71.png"></a>
          </div>
          <div class="clear"></div>
        </div>
      </div>

      <!-- browsers widgets for every platform -->

                          <div class="browsers" id="browsers-winxp" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="ie">
              <img src="/images/browser-icons/ie.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="6" disabled><input type="button" value="7" disabled><input type="button" value="8" disabled>                          <div id="versions-incentive">
                <p>Windows XP and IE 6, 7, 8 are only available to paying users. <a href="/#pricing">Upgrade to the paid plan</a> to unlock Windows XP and Internet Explorers!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="chrome">
              <img src="/images/browser-icons/chrome.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="1" disabled><input type="button" value="2" disabled><input type="button" value="3" disabled><input type="button" value="4" disabled><input type="button" value="5" disabled><input type="button" value="6" disabled><input type="button" value="7" disabled><input type="button" value="8" disabled><input type="button" value="9" disabled><input type="button" value="10" disabled><input type="button" value="11" disabled><input type="button" value="12" disabled><input type="button" value="13" disabled><input type="button" value="14" disabled><input type="button" value="15" disabled><input type="button" value="16" disabled><input type="button" value="17" disabled><input type="button" value="18" disabled><input type="button" value="19" disabled><input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="canary" class="canary" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="firefox">
              <img src="/images/browser-icons/firefox.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="3" disabled><input type="button" value="3.5" disabled><input type="button" value="3.6" disabled><input type="button" value="4" disabled><input type="button" value="5" disabled><input type="button" value="6" disabled><input type="button" value="7" disabled><input type="button" value="8" disabled><input type="button" value="9" disabled><input type="button" value="10" disabled><input type="button" value="11" disabled><input type="button" value="12" disabled><input type="button" value="13" disabled><input type="button" value="14" disabled><input type="button" value="15" disabled><input type="button" value="16" disabled><input type="button" value="17" disabled><input type="button" value="18" disabled><input type="button" value="19" disabled><input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="nightly" class="nightly" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="safari">
              <img src="/images/browser-icons/safari.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4" disabled><input type="button" value="5.0.5" class="safari505" disabled><input type="button" value="5.1" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget no-margin-bottom">
          <div class="icon">
            <div id="opera">
              <img src="/images/browser-icons/opera.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="10" disabled><input type="button" value="10.5" disabled><input type="button" value="11" disabled><input type="button" value="11.5" disabled><input type="button" value="11.6" disabled><input type="button" value="12" disabled><input type="button" value="15" disabled><input type="button" value="16" disabled><input type="button" value="17" disabled><input type="button" value="18" disabled><input type="button" value="19" disabled><input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="next" class="next" disabled>          </div>
          <div class="clear"></div>
        </div>
      </div>

      <div class="browsers" id="browsers-all">
        <div class="browser-widget">
          <div class="icon">
            <div id="ie">
              <img src="/images/browser-icons/ie.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="6" disabled><input type="button" value="7" disabled><input type="button" value="8" disabled><input type="button" value="9"><input type="button" value="10" disabled><input type="button" value="11" disabled>                          <div id="versions-incentive">
                <a href="/#pricing">Upgrade to the paid plan</a> to unlock IE 6, 7, 8, 10, and 11!
              </div>
                      </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="chrome">
              <img src="/images/browser-icons/chrome.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="1"><input type="button" value="2"><input type="button" value="3"><input type="button" value="4"><input type="button" value="5"><input type="button" value="6"><input type="button" value="7"><input type="button" value="8"><input type="button" value="9"><input type="button" value="10"><input type="button" value="11"><input type="button" value="12"><input type="button" value="13"><input type="button" value="14"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="41"><input type="button" value="42"><input type="button" value="43"><input type="button" value="44"><input type="button" value="45"><input type="button" value="46"><input type="button" value="47"><input type="button" value="48"><input type="button" value="49"><input type="button" value="50"><input type="button" value="51"><input type="button" value="52"><input type="button" value="53"><input type="button" value="canary" class="canary">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="firefox">
              <img src="/images/browser-icons/firefox.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="3"><input type="button" value="3.5"><input type="button" value="3.6"><input type="button" value="4"><input type="button" value="5"><input type="button" value="6"><input type="button" value="7"><input type="button" value="8"><input type="button" value="9"><input type="button" value="10"><input type="button" value="11"><input type="button" value="12"><input type="button" value="13"><input type="button" value="14"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="41"><input type="button" value="42"><input type="button" value="43"><input type="button" value="44"><input type="button" value="45"><input type="button" value="46"><input type="button" value="47"><input type="button" value="48"><input type="button" value="49"><input type="button" value="nightly" class="nightly">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="safari">
              <img src="/images/browser-icons/safari.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4"><input type="button" value="5.0.5" class="safari505"><input type="button" value="5.1">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget no-margin-bottom">
          <div class="icon">
            <div id="opera">
              <img src="/images/browser-icons/opera.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="10"><input type="button" value="10.5"><input type="button" value="11"><input type="button" value="11.5"><input type="button" value="11.6"><input type="button" value="12"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="next" class="next">          </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-winvista" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="ie">
              <img src="/images/browser-icons/ie.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="9">                          <div id="versions-incentive">
                <p><a href="/#pricing">Upgrade to the paid plan</a> to unlock other IE versions!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="chrome">
              <img src="/images/browser-icons/chrome.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="1"><input type="button" value="2"><input type="button" value="3"><input type="button" value="4"><input type="button" value="5"><input type="button" value="6"><input type="button" value="7"><input type="button" value="8"><input type="button" value="9"><input type="button" value="10"><input type="button" value="11"><input type="button" value="12"><input type="button" value="13"><input type="button" value="14"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="41"><input type="button" value="42"><input type="button" value="43"><input type="button" value="44"><input type="button" value="45"><input type="button" value="46"><input type="button" value="47"><input type="button" value="48"><input type="button" value="49"><input type="button" value="50"><input type="button" value="canary" class="canary">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="firefox">
              <img src="/images/browser-icons/firefox.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="3"><input type="button" value="3.5"><input type="button" value="3.6"><input type="button" value="4"><input type="button" value="5"><input type="button" value="6"><input type="button" value="7"><input type="button" value="8"><input type="button" value="9"><input type="button" value="10"><input type="button" value="11"><input type="button" value="12"><input type="button" value="13"><input type="button" value="14"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="41"><input type="button" value="42"><input type="button" value="43"><input type="button" value="44"><input type="button" value="45"><input type="button" value="46"><input type="button" value="47"><input type="button" value="48"><input type="button" value="49"><input type="button" value="50"><input type="button" value="51"><input type="button" value="52"><input type="button" value="nightly" class="nightly">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="safari">
              <img src="/images/browser-icons/safari.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4"><input type="button" value="5.0.5" class="safari505"><input type="button" value="5.1">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget no-margin-bottom">
          <div class="icon">
            <div id="opera">
              <img src="/images/browser-icons/opera.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="10"><input type="button" value="10.5"><input type="button" value="11"><input type="button" value="11.5"><input type="button" value="11.6"><input type="button" value="12"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="next" class="next">          </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-win7" style="display: block">
        <div class="browser-widget">
          <div class="icon">
            <div id="ie">
              <img src="/images/browser-icons/ie.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="10" disabled><input type="button" value="11">                          <div id="versions-incentive">
                <p><a href="/#pricing">Upgrade to the paid plan</a> to unlock other IE versions!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="chrome">
              <img src="/images/browser-icons/chrome.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="1"><input type="button" value="2"><input type="button" value="3"><input type="button" value="4"><input type="button" value="5"><input type="button" value="6"><input type="button" value="7"><input type="button" value="8"><input type="button" value="9"><input type="button" value="10"><input type="button" value="11"><input type="button" value="12"><input type="button" value="13"><input type="button" value="14"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="41"><input type="button" value="42"><input type="button" value="43"><input type="button" value="44"><input type="button" value="45"><input type="button" value="46"><input type="button" value="47"><input type="button" value="48"><input type="button" value="49"><input type="button" value="50"><input type="button" value="51"><input type="button" value="52"><input type="button" value="53"><input type="button" value="54"><input type="button" value="55" class="selected"><input type="button" value="56"><input type="button" value="57"><input type="button" value="58"><input type="button" value="59"><input type="button" value="60"><input type="button" value="61"><input type="button" value="62"><input type="button" value="63"><input type="button" value="64"><input type="button" value="65"><input type="button" value="66"><input type="button" value="67"><input type="button" value="68"><input type="button" value="69"><input type="button" value="70"><input type="button" value="71"><input type="button" value="72"><input type="button" value="73"><input type="button" value="74"><input type="button" value="75"><input type="button" value="76"><input type="button" value="77"><input type="button" value="78"><input type="button" value="79"><input type="button" value="80"><input type="button" value="81"><input type="button" value="83"><input type="button" value="84"><input type="button" value="85"><input type="button" value="86"><input type="button" value="canary" class="canary">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="firefox">
              <img src="/images/browser-icons/firefox.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="3"><input type="button" value="3.5"><input type="button" value="3.6"><input type="button" value="4"><input type="button" value="5"><input type="button" value="6"><input type="button" value="7"><input type="button" value="8"><input type="button" value="9"><input type="button" value="10"><input type="button" value="11"><input type="button" value="12"><input type="button" value="13"><input type="button" value="14"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="41"><input type="button" value="42"><input type="button" value="43"><input type="button" value="44"><input type="button" value="45"><input type="button" value="46"><input type="button" value="47"><input type="button" value="48"><input type="button" value="49"><input type="button" value="50"><input type="button" value="51"><input type="button" value="52"><input type="button" value="53"><input type="button" value="54"><input type="button" value="55"><input type="button" value="56"><input type="button" value="57"><input type="button" value="58"><input type="button" value="59"><input type="button" value="60"><input type="button" value="61"><input type="button" value="62"><input type="button" value="63"><input type="button" value="64"><input type="button" value="65"><input type="button" value="66"><input type="button" value="67"><input type="button" value="68"><input type="button" value="69"><input type="button" value="70"><input type="button" value="71"><input type="button" value="72"><input type="button" value="73"><input type="button" value="74"><input type="button" value="75"><input type="button" value="76"><input type="button" value="77"><input type="button" value="78"><input type="button" value="79"><input type="button" value="80"><input type="button" value="81"><input type="button" value="82"><input type="button" value="nightly" class="nightly">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="safari">
              <img src="/images/browser-icons/safari.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4"><input type="button" value="5.0.5" class="safari505"><input type="button" value="5.1">          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget no-margin-bottom">
          <div class="icon">
            <div id="opera">
              <img src="/images/browser-icons/opera.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="10"><input type="button" value="10.5"><input type="button" value="11"><input type="button" value="11.5"><input type="button" value="11.6"><input type="button" value="12"><input type="button" value="15"><input type="button" value="16"><input type="button" value="17"><input type="button" value="18"><input type="button" value="19"><input type="button" value="20"><input type="button" value="21"><input type="button" value="22"><input type="button" value="23"><input type="button" value="24"><input type="button" value="25"><input type="button" value="26"><input type="button" value="27"><input type="button" value="28"><input type="button" value="29"><input type="button" value="30"><input type="button" value="31"><input type="button" value="32"><input type="button" value="33"><input type="button" value="34"><input type="button" value="35"><input type="button" value="36"><input type="button" value="37"><input type="button" value="38"><input type="button" value="39"><input type="button" value="40"><input type="button" value="41"><input type="button" value="42"><input type="button" value="43"><input type="button" value="44"><input type="button" value="45"><input type="button" value="46"><input type="button" value="47"><input type="button" value="48"><input type="button" value="49"><input type="button" value="50"><input type="button" value="51"><input type="button" value="52"><input type="button" value="53"><input type="button" value="54"><input type="button" value="55"><input type="button" value="56"><input type="button" value="57"><input type="button" value="58"><input type="button" value="60"><input type="button" value="62"><input type="button" value="63"><input type="button" value="64"><input type="button" value="65"><input type="button" value="66"><input type="button" value="67"><input type="button" value="68"><input type="button" value="69"><input type="button" value="70"><input type="button" value="71"><input type="button" value="next" class="next">          </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-win8" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="ie">
              <img src="/images/browser-icons/ie.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="10" disabled>                          <div id="versions-incentive">
                <p>Windows 8 and IE 10 is only available to paying users. <a href="/#pricing">Upgrade to the paid plan</a> to unlock Windows 8 and IE 10!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="chrome">
              <img src="/images/browser-icons/chrome.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="50" disabled><input type="button" value="51" disabled><input type="button" value="52" disabled><input type="button" value="53" disabled><input type="button" value="54" disabled><input type="button" value="55" class="selected" disabled><input type="button" value="56" disabled><input type="button" value="57" disabled><input type="button" value="canary" class="canary" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="firefox">
              <img src="/images/browser-icons/firefox.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="50" disabled><input type="button" value="51" disabled><input type="button" value="52" disabled><input type="button" value="nightly" class="nightly" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="safari">
              <img src="/images/browser-icons/safari.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4" disabled><input type="button" value="5.0.5" class="safari505" disabled><input type="button" value="5.1" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget no-margin-bottom">
          <div class="icon">
            <div id="opera">
              <img src="/images/browser-icons/opera.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="next" class="next" disabled>          </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-win81" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="ie">
              <img src="/images/browser-icons/ie.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="11" disabled>                          <div id="versions-incentive">
                <p>Windows 8.1 and IE 11 is only available to paying users. <a href="/#pricing">Upgrade to the paid plan</a> to unlock Windows 8.1 and IE 11!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="chrome">
              <img src="/images/browser-icons/chrome.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="50" disabled><input type="button" value="51" disabled><input type="button" value="52" disabled><input type="button" value="53" disabled><input type="button" value="54" disabled><input type="button" value="55" class="selected" disabled><input type="button" value="56" disabled><input type="button" value="57" disabled><input type="button" value="canary" class="canary" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="firefox">
              <img src="/images/browser-icons/firefox.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="50" disabled><input type="button" value="51" disabled><input type="button" value="52" disabled><input type="button" value="nightly" class="nightly" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="safari">
              <img src="/images/browser-icons/safari.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4" disabled><input type="button" value="5.0.5" class="safari505" disabled><input type="button" value="5.1" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget no-margin-bottom">
          <div class="icon">
            <div id="opera">
              <img src="/images/browser-icons/opera.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="next" class="next" disabled>          </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-win10" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="edge">
              <img src="/images/browser-icons/edge.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="38" disabled> (latest)                          <div id="versions-incentive">
                <p>Windows 10 and Edge browser is only available to paying users. <a href="/#pricing">Upgrade to the paid plan</a> to unlock Windows 10 and Edge!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="ie">
              <img src="/images/browser-icons/ie.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="11" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="chrome">
              <img src="/images/browser-icons/chrome.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="1" disabled><input type="button" value="2" disabled><input type="button" value="3" disabled><input type="button" value="4" disabled><input type="button" value="5" disabled><input type="button" value="6" disabled><input type="button" value="7" disabled><input type="button" value="8" disabled><input type="button" value="9" disabled><input type="button" value="10" disabled><input type="button" value="11" disabled><input type="button" value="12" disabled><input type="button" value="13" disabled><input type="button" value="14" disabled><input type="button" value="15" disabled><input type="button" value="16" disabled><input type="button" value="17" disabled><input type="button" value="18" disabled><input type="button" value="19" disabled><input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="50" disabled><input type="button" value="51" disabled><input type="button" value="52" disabled><input type="button" value="53" disabled><input type="button" value="54" disabled><input type="button" value="55" class="selected" disabled><input type="button" value="56" disabled><input type="button" value="canary" class="canary" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="firefox">
              <img src="/images/browser-icons/firefox.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="3" disabled><input type="button" value="3.5" disabled><input type="button" value="3.6" disabled><input type="button" value="4" disabled><input type="button" value="5" disabled><input type="button" value="6" disabled><input type="button" value="7" disabled><input type="button" value="8" disabled><input type="button" value="9" disabled><input type="button" value="10" disabled><input type="button" value="11" disabled><input type="button" value="12" disabled><input type="button" value="13" disabled><input type="button" value="14" disabled><input type="button" value="15" disabled><input type="button" value="16" disabled><input type="button" value="17" disabled><input type="button" value="18" disabled><input type="button" value="19" disabled><input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="44" disabled><input type="button" value="45" disabled><input type="button" value="46" disabled><input type="button" value="47" disabled><input type="button" value="48" disabled><input type="button" value="49" disabled><input type="button" value="50" disabled><input type="button" value="51" disabled><input type="button" value="nightly" class="nightly" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget">
          <div class="icon">
            <div id="safari">
              <img src="/images/browser-icons/safari.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4" disabled><input type="button" value="5.0.5" class="safari505" disabled><input type="button" value="5.1" disabled>          </div>
          <div class="clear"></div>
        </div>
        <div class="browser-widget no-margin-bottom">
          <div class="icon">
            <div id="opera">
              <img src="https://browserling.com/images/browser-icons/opera.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="10" disabled><input type="button" value="10.5" disabled><input type="button" value="11" disabled><input type="button" value="11.5" disabled><input type="button" value="11.6" disabled><input type="button" value="12" disabled><input type="button" value="15" disabled><input type="button" value="16" disabled><input type="button" value="17" disabled><input type="button" value="18" disabled><input type="button" value="19" disabled><input type="button" value="20" disabled><input type="button" value="21" disabled><input type="button" value="22" disabled><input type="button" value="23" disabled><input type="button" value="24" disabled><input type="button" value="25" disabled><input type="button" value="26" disabled><input type="button" value="27" disabled><input type="button" value="28" disabled><input type="button" value="29" disabled><input type="button" value="30" disabled><input type="button" value="31" disabled><input type="button" value="32" disabled><input type="button" value="33" disabled><input type="button" value="34" disabled><input type="button" value="35" disabled><input type="button" value="36" disabled><input type="button" value="37" disabled><input type="button" value="38" disabled><input type="button" value="39" disabled><input type="button" value="40" disabled><input type="button" value="41" disabled><input type="button" value="42" disabled><input type="button" value="43" disabled><input type="button" value="next" class="next" disabled>          </div>
          <div class="clear"></div>
        </div>
      </div>


                          <div class="browsers" id="browsers-android44" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="android">
              <img src="https://browserling.com/images/browser-icons/android.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="4.4" disabled>                          <div id="versions-incentive">
                <p>Android is only available to paying users. <a href="https://browserling.com/#pricing">Upgrade to the paid plan</a> to unlock Android!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-android50" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="android">
              <img src="https://browserling.com/images/browser-icons/android.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="5.0" disabled>                          <div id="versions-incentive">
                <p>Android is only available to paying users. <a href="https://browserling.com/#pricing">Upgrade to the paid plan</a> to unlock Android!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-android51" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="android">
              <img src="https://browserling.com/images/browser-icons/android.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="5.1" disabled>                          <div id="versions-incentive">
                <p>Android is only available to paying users. <a href="https://browserling.com/#pricing">Upgrade to the paid plan</a> to unlock Android!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-android60" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="android">
              <img src="https://browserling.com/images/browser-icons/android.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="6.0" disabled>                          <div id="versions-incentive">
                <p>Android is only available to paying users. <a href="https://browserling.com/#pricing">Upgrade to the paid plan</a> to unlock Android!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-android70" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="android">
              <img src="https://browserling.com/images/browser-icons/android.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="7.0" disabled>                          <div id="versions-incentive">
                <p>Android is only available to paying users. <a href="https://browserling.com/#pricing">Upgrade to the paid plan</a> to unlock Android!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
      </div>

                          <div class="browsers" id="browsers-android71" style="">
        <div class="browser-widget">
          <div class="icon">
            <div id="android">
              <img src="https://browserling.com/images/browser-icons/android.png">
            </div>
          </div>
          <div class="versions">
            <input type="button" value="7.1">                          <div id="versions-incentive">
                <p><a href="https://browserling.com/#pricing">Upgrade to the paid plan</a> to unlock other Android versions!</p>
              </div>
                      </div>
          <div class="clear"></div>
        </div>
      </div>

    </div> <!-- <div id="browser-menu"> -->
  </body>
</html>
