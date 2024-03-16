import Missile from "./Missile";

import TEAM from "../constants/team";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class MissileLauncher {
  #projectileNumber = 30;
  #missileYModifier = 50;

  constructor(width, height) {
    this.x;
    this.y;
    this.width = width;
    this.height = height;

    this.missileList = [];
  }

  setTargetList(targetList) {
    this.targetList = targetList;
  }

  makeMissile({
    projectilePath,
    x,
    y,
    missileWidth,
    missileDamage,
    team,
    missileSpeed,
    isAimed = false,
  }) {
    const missile = new Missile(projectilePath);
    this.x = x;
    this.y = y;

    const shipCenter =
      team === TEAM.PLATER
        ? this.x + this.width / 2 - missileWidth / 2
        : this.x + this.width / 2 - missileWidth / 4;

    missile.team = team;
    missile.x = shipCenter;
    missile.y =
      team === TEAM.PLATER
        ? this.y - this.#missileYModifier
        : this.y + this.#missileYModifier;
    missile.damage = missileDamage;
    missile.speed = missileSpeed;

    if (isAimed) {
      const { vx, vy, angle } = this.getTargetDirection(missile);

      missile.vx = vx;
      missile.vy = vy;
      missile.angle = angle;
    }

    return missile;
  }

  loadSingleAmmo(missileInformation) {
    const missile = this.makeMissile(missileInformation);

    this.missileList.push(missile);
  }

  loadMultipleAmmo(missileInformation) {
    const radiansPerProjectile = (Math.PI * 2) / this.#projectileNumber;

    for (let i = 0; i < this.#projectileNumber; i += 1) {
      const angle = radiansPerProjectile * i;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      const missile = this.makeMissile(missileInformation);

      missile.vx = dx * missile.speed;
      missile.vy = dy * missile.speed;

      this.missileList.push(missile);
    }
  }

  render() {
    this.missileList.forEach((missile) => {
      if (missile.isVanished) {
        return;
      }

      if (missile.angle !== undefined) {
        missile.renderAngle(
          missile.x,
          missile.y,
          missile.width,
          missile.height,
          missile.angle,
        );
        return;
      }

      if (missile.team === TEAM.PLATER) {
        missile.render(missile.x, missile.y);
        return;
      }

      missile.render(
        missile.x,
        missile.y,
        missile.width / 2,
        missile.height / 2,
      );
    });
  }

  setMissileRoute(missileRoute) {
    this.missileList.forEach((missile) => {
      switch (missileRoute) {
        case MISSILE_ROUTE_COMMAND.PLATER_STRAIGHT:
          missile.playerStraight(missile.speed);
          break;

        case MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT:
          missile.enemyStraight(missile.speed);
          break;

        case MISSILE_ROUTE_COMMAND.ENEMY_AIMED:
          missile.enemyTargetMove();
          break;

        case MISSILE_ROUTE_COMMAND.GUIDED:
          const { vx, vy, angle } = this.getTargetDirection(missile);

          if (vx === 0 && vy === 0) {
            if (missile.vx && missile.vy) {
              missile.enemyTargetMove();

              return;
            }

            missile.playerStraight(missile.speed);
            return;
          }

          if (missile.frame < 120) {
            missile.vx = vx;
            missile.vy = vy;
            missile.angle = angle;
          }

          missile.enemyTargetMove();
          break;

        case MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY:
          missile.enemyTargetMove();
          break;
      }

      missile.frame += 1;
    });
  }

  getTargetDirection(missile) {
    let closestTarget = null;
    let minDistance = Infinity;

    this.targetList.forEach((target) => {
      if (target.isDestroyed) {
        return;
      }

      const targetX = target.x + target.width / 2;
      const targetY = target.y + target.height / 2;

      const dx = targetX - missile.x;
      const dy = targetY - missile.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance < minDistance) {
        closestTarget = target;
        minDistance = distance;
      }
    });

    if (closestTarget === null) {
      missile.isLostTarget = true;

      return { vx: 0, vy: 0, angle: 0 };
    }

    const targetX = closestTarget.x + closestTarget.width / 2;
    const targetY = closestTarget.y + closestTarget.height / 2;

    const dx = targetX - missile.x;
    const dy = targetY - missile.y;
    const magnitude = Math.sqrt(dx ** 2 + dy ** 2);
    const normalizedDx = dx / magnitude;
    const normalizedDy = dy / magnitude;

    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    const vx = normalizedDx * missile.speed;
    const vy = normalizedDy * missile.speed;

    return { vx, vy, angle };
  }
}

export default MissileLauncher;
