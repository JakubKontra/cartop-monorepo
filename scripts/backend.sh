#!/bin/bash

# Backend Management Script
# Usage:
#   ./scripts/backend.sh start   - Start backend
#   ./scripts/backend.sh stop    - Stop backend
#   ./scripts/backend.sh restart - Restart backend
#   ./scripts/backend.sh status  - Check status

PORT=3000
APP_DIR="/Users/jakubkontra/Work/cartop/cartop-monorepo"

check_port() {
  lsof -ti:$PORT
}

stop_backend() {
  echo "🛑 Stopping backend on port $PORT..."

  # Kill by port
  PID=$(check_port)
  if [ -n "$PID" ]; then
    kill -9 $PID 2>/dev/null
    echo "   Killed process $PID"
  fi

  # Kill all nest processes
  pkill -9 -f "nest start" 2>/dev/null

  # Kill background bash shells running nest
  pkill -9 -f "npm run start:dev" 2>/dev/null

  sleep 1

  if [ -z "$(check_port)" ]; then
    echo "✅ Backend stopped successfully"
  else
    echo "⚠️  Some processes may still be running"
  fi
}

start_backend() {
  if [ -n "$(check_port)" ]; then
    echo "⚠️  Port $PORT is already in use!"
    echo "   Run: ./scripts/backend.sh stop"
    exit 1
  fi

  echo "🚀 Starting backend..."
  cd "$APP_DIR"
  yarn workspace @cartop/backend dev
}

restart_backend() {
  stop_backend
  sleep 2
  start_backend
}

status_backend() {
  PID=$(check_port)
  if [ -n "$PID" ]; then
    echo "✅ Backend is running (PID: $PID)"
    ps -p $PID -o pid,command

    # Test if responding
    if curl -s http://localhost:$PORT/graphql >/dev/null 2>&1; then
      echo "🌐 GraphQL endpoint: http://localhost:$PORT/graphql ✅"
    fi
    if curl -s http://localhost:$PORT/api/docs >/dev/null 2>&1; then
      echo "📖 Swagger docs: http://localhost:$PORT/api/docs ✅"
    fi
  else
    echo "❌ Backend is not running"
    echo "   Run: ./scripts/backend.sh start"
  fi
}

case "$1" in
  start)
    start_backend
    ;;
  stop)
    stop_backend
    ;;
  restart)
    restart_backend
    ;;
  status)
    status_backend
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status}"
    exit 1
    ;;
esac
