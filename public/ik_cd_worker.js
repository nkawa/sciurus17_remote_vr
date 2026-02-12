class D {
  constructor(e, t, i, s) {
    this.g1 = e, this.a1 = t, this.v1 = i, this.a2 = s, this.constrained = !1, this.x0 = 0;
  }
  #e(e) {
    const t = this.a1, i = this.v1, s = this.g1, o = e * e;
    let l = 0;
    return o < ((a) => a * a)(t / (s * s)) ? l = -s * e : o < ((a) => a * a)(t / (2 * s * s) + i * i / (2 * t)) ? l = -Math.sqrt(t * (2 * Math.abs(e) - t / (s * s))) * Math.sign(e) : l = -i * Math.sign(e), l;
  }
  setX0(e) {
    this.x0 = e;
  }
  calcNext(e, t, i) {
    const s = e - this.x0;
    if (this.constrained === !0)
      return {
        x: this.x0 + s + t * i,
        v: this.#e(s + t * i),
        constrained: !0
      };
    if (t < this.#e(s)) {
      const o = t + this.a2 * i, l = s + t * i;
      return o < this.#e(l) ? {
        x: this.x0 + l,
        v: o,
        constrained: !1
      } : (this.constrained = !0, {
        x: this.x0 + l,
        v: this.#e(l),
        constrained: !0
      });
    } else {
      const o = t - this.a2 * i, l = s + t * i;
      return o > this.#e(l) ? {
        x: this.x0 + l,
        v: o,
        constrained: !1
      } : (this.constrained = !0, {
        x: this.x0 + l,
        v: this.#e(l),
        constrained: !0
      });
    }
  }
  reset() {
    this.constrained = !1;
  }
}
function W(n) {
  const e = n.length;
  let t = 0, i = 0;
  for (; i < e; ) {
    let s = n.charCodeAt(i++);
    if ((s & 4294967168) === 0) {
      t++;
      continue;
    } else if ((s & 4294965248) === 0)
      t += 2;
    else {
      if (s >= 55296 && s <= 56319 && i < e) {
        const o = n.charCodeAt(i);
        (o & 64512) === 56320 && (++i, s = ((s & 1023) << 10) + (o & 1023) + 65536);
      }
      (s & 4294901760) === 0 ? t += 3 : t += 4;
    }
  }
  return t;
}
function O(n, e, t) {
  const i = n.length;
  let s = t, o = 0;
  for (; o < i; ) {
    let l = n.charCodeAt(o++);
    if ((l & 4294967168) === 0) {
      e[s++] = l;
      continue;
    } else if ((l & 4294965248) === 0)
      e[s++] = l >> 6 & 31 | 192;
    else {
      if (l >= 55296 && l <= 56319 && o < i) {
        const a = n.charCodeAt(o);
        (a & 64512) === 56320 && (++o, l = ((l & 1023) << 10) + (a & 1023) + 65536);
      }
      (l & 4294901760) === 0 ? (e[s++] = l >> 12 & 15 | 224, e[s++] = l >> 6 & 63 | 128) : (e[s++] = l >> 18 & 7 | 240, e[s++] = l >> 12 & 63 | 128, e[s++] = l >> 6 & 63 | 128);
    }
    e[s++] = l & 63 | 128;
  }
}
const G = new TextEncoder(), $ = 50;
function K(n, e, t) {
  G.encodeInto(n, e.subarray(t));
}
function Q(n, e, t) {
  n.length > $ ? K(n, e, t) : O(n, e, t);
}
new TextDecoder();
class R {
  constructor(e, t) {
    this.type = e, this.data = t;
  }
}
class M extends Error {
  constructor(e) {
    super(e);
    const t = Object.create(M.prototype);
    Object.setPrototypeOf(this, t), Object.defineProperty(this, "name", {
      configurable: !0,
      enumerable: !1,
      value: M.name
    });
  }
}
function H(n, e, t) {
  const i = t / 4294967296, s = t;
  n.setUint32(e, i), n.setUint32(e + 4, s);
}
function P(n, e, t) {
  const i = Math.floor(t / 4294967296), s = t;
  n.setUint32(e, i), n.setUint32(e + 4, s);
}
function q(n, e) {
  const t = n.getInt32(e), i = n.getUint32(e + 4);
  return t * 4294967296 + i;
}
const Y = -1, X = 4294967296 - 1, Z = 17179869184 - 1;
function ee({ sec: n, nsec: e }) {
  if (n >= 0 && e >= 0 && n <= Z)
    if (e === 0 && n <= X) {
      const t = new Uint8Array(4);
      return new DataView(t.buffer).setUint32(0, n), t;
    } else {
      const t = n / 4294967296, i = n & 4294967295, s = new Uint8Array(8), o = new DataView(s.buffer);
      return o.setUint32(0, e << 2 | t & 3), o.setUint32(4, i), s;
    }
  else {
    const t = new Uint8Array(12), i = new DataView(t.buffer);
    return i.setUint32(0, e), P(i, 4, n), t;
  }
}
function te(n) {
  const e = n.getTime(), t = Math.floor(e / 1e3), i = (e - t * 1e3) * 1e6, s = Math.floor(i / 1e9);
  return {
    sec: t + s,
    nsec: i - s * 1e9
  };
}
function ie(n) {
  if (n instanceof Date) {
    const e = te(n);
    return ee(e);
  } else
    return null;
}
function se(n) {
  const e = new DataView(n.buffer, n.byteOffset, n.byteLength);
  switch (n.byteLength) {
    case 4:
      return { sec: e.getUint32(0), nsec: 0 };
    case 8: {
      const t = e.getUint32(0), i = e.getUint32(4), s = (t & 3) * 4294967296 + i, o = t >>> 2;
      return { sec: s, nsec: o };
    }
    case 12: {
      const t = q(e, 4), i = e.getUint32(0);
      return { sec: t, nsec: i };
    }
    default:
      throw new M(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${n.length}`);
  }
}
function ne(n) {
  const e = se(n);
  return new Date(e.sec * 1e3 + e.nsec / 1e6);
}
const oe = {
  type: Y,
  encode: ie,
  decode: ne
};
class A {
  constructor() {
    this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(oe);
  }
  register({ type: e, encode: t, decode: i }) {
    if (e >= 0)
      this.encoders[e] = t, this.decoders[e] = i;
    else {
      const s = -1 - e;
      this.builtInEncoders[s] = t, this.builtInDecoders[s] = i;
    }
  }
  tryToEncode(e, t) {
    for (let i = 0; i < this.builtInEncoders.length; i++) {
      const s = this.builtInEncoders[i];
      if (s != null) {
        const o = s(e, t);
        if (o != null) {
          const l = -1 - i;
          return new R(l, o);
        }
      }
    }
    for (let i = 0; i < this.encoders.length; i++) {
      const s = this.encoders[i];
      if (s != null) {
        const o = s(e, t);
        if (o != null) {
          const l = i;
          return new R(l, o);
        }
      }
    }
    return e instanceof R ? e : null;
  }
  decode(e, t, i) {
    const s = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
    return s ? s(e, t, i) : new R(t, e);
  }
}
A.defaultCodec = new A();
function re(n) {
  return n instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && n instanceof SharedArrayBuffer;
}
function le(n) {
  return n instanceof Uint8Array ? n : ArrayBuffer.isView(n) ? new Uint8Array(n.buffer, n.byteOffset, n.byteLength) : re(n) ? new Uint8Array(n) : Uint8Array.from(n);
}
const ae = 100, ce = 2048;
class I {
  constructor(e) {
    this.entered = !1, this.extensionCodec = e?.extensionCodec ?? A.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.maxDepth = e?.maxDepth ?? ae, this.initialBufferSize = e?.initialBufferSize ?? ce, this.sortKeys = e?.sortKeys ?? !1, this.forceFloat32 = e?.forceFloat32 ?? !1, this.ignoreUndefined = e?.ignoreUndefined ?? !1, this.forceIntegerToFloat = e?.forceIntegerToFloat ?? !1, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new I({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  /**
   * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
   *
   * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
   */
  encodeSharedRef(e) {
    if (this.entered)
      return this.clone().encodeSharedRef(e);
    try {
      return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = !1;
    }
  }
  /**
   * @returns Encodes the object and returns a copy of the encoder's internal buffer.
   */
  encode(e) {
    if (this.entered)
      return this.clone().encode(e);
    try {
      return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos);
    } finally {
      this.entered = !1;
    }
  }
  doEncode(e, t) {
    if (t > this.maxDepth)
      throw new Error(`Too deep objects in depth ${t}`);
    e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.forceIntegerToFloat ? this.encodeNumberAsFloat(e) : this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.useBigInt64 && typeof e == "bigint" ? this.encodeBigInt64(e) : this.encodeObject(e, t);
  }
  ensureBufferSizeToWrite(e) {
    const t = this.pos + e;
    this.view.byteLength < t && this.resizeBuffer(t * 2);
  }
  resizeBuffer(e) {
    const t = new ArrayBuffer(e), i = new Uint8Array(t), s = new DataView(t);
    i.set(this.bytes), this.view = s, this.bytes = i;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(e) {
    e === !1 ? this.writeU8(194) : this.writeU8(195);
  }
  encodeNumber(e) {
    !this.forceIntegerToFloat && Number.isSafeInteger(e) ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(211), this.writeI64(e)) : this.encodeNumberAsFloat(e);
  }
  encodeNumberAsFloat(e) {
    this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e));
  }
  encodeBigInt64(e) {
    e >= BigInt(0) ? (this.writeU8(207), this.writeBigUint64(e)) : (this.writeU8(211), this.writeBigInt64(e));
  }
  writeStringHeader(e) {
    if (e < 32)
      this.writeU8(160 + e);
    else if (e < 256)
      this.writeU8(217), this.writeU8(e);
    else if (e < 65536)
      this.writeU8(218), this.writeU16(e);
    else if (e < 4294967296)
      this.writeU8(219), this.writeU32(e);
    else
      throw new Error(`Too long string: ${e} bytes in UTF-8`);
  }
  encodeString(e) {
    const i = W(e);
    this.ensureBufferSizeToWrite(5 + i), this.writeStringHeader(i), Q(e, this.bytes, this.pos), this.pos += i;
  }
  encodeObject(e, t) {
    const i = this.extensionCodec.tryToEncode(e, this.context);
    if (i != null)
      this.encodeExtension(i);
    else if (Array.isArray(e))
      this.encodeArray(e, t);
    else if (ArrayBuffer.isView(e))
      this.encodeBinary(e);
    else if (typeof e == "object")
      this.encodeMap(e, t);
    else
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
  }
  encodeBinary(e) {
    const t = e.byteLength;
    if (t < 256)
      this.writeU8(196), this.writeU8(t);
    else if (t < 65536)
      this.writeU8(197), this.writeU16(t);
    else if (t < 4294967296)
      this.writeU8(198), this.writeU32(t);
    else
      throw new Error(`Too large binary: ${t}`);
    const i = le(e);
    this.writeU8a(i);
  }
  encodeArray(e, t) {
    const i = e.length;
    if (i < 16)
      this.writeU8(144 + i);
    else if (i < 65536)
      this.writeU8(220), this.writeU16(i);
    else if (i < 4294967296)
      this.writeU8(221), this.writeU32(i);
    else
      throw new Error(`Too large array: ${i}`);
    for (const s of e)
      this.doEncode(s, t + 1);
  }
  countWithoutUndefined(e, t) {
    let i = 0;
    for (const s of t)
      e[s] !== void 0 && i++;
    return i;
  }
  encodeMap(e, t) {
    const i = Object.keys(e);
    this.sortKeys && i.sort();
    const s = this.ignoreUndefined ? this.countWithoutUndefined(e, i) : i.length;
    if (s < 16)
      this.writeU8(128 + s);
    else if (s < 65536)
      this.writeU8(222), this.writeU16(s);
    else if (s < 4294967296)
      this.writeU8(223), this.writeU32(s);
    else
      throw new Error(`Too large map object: ${s}`);
    for (const o of i) {
      const l = e[o];
      this.ignoreUndefined && l === void 0 || (this.encodeString(o), this.doEncode(l, t + 1));
    }
  }
  encodeExtension(e) {
    if (typeof e.data == "function") {
      const i = e.data(this.pos + 6), s = i.length;
      if (s >= 4294967296)
        throw new Error(`Too large extension object: ${s}`);
      this.writeU8(201), this.writeU32(s), this.writeI8(e.type), this.writeU8a(i);
      return;
    }
    const t = e.data.length;
    if (t === 1)
      this.writeU8(212);
    else if (t === 2)
      this.writeU8(213);
    else if (t === 4)
      this.writeU8(214);
    else if (t === 8)
      this.writeU8(215);
    else if (t === 16)
      this.writeU8(216);
    else if (t < 256)
      this.writeU8(199), this.writeU8(t);
    else if (t < 65536)
      this.writeU8(200), this.writeU16(t);
    else if (t < 4294967296)
      this.writeU8(201), this.writeU32(t);
    else
      throw new Error(`Too large extension object: ${t}`);
    this.writeI8(e.type), this.writeU8a(e.data);
  }
  writeU8(e) {
    this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++;
  }
  writeU8a(e) {
    const t = e.length;
    this.ensureBufferSizeToWrite(t), this.bytes.set(e, this.pos), this.pos += t;
  }
  writeI8(e) {
    this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++;
  }
  writeU16(e) {
    this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2;
  }
  writeI16(e) {
    this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2;
  }
  writeU32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4;
  }
  writeI32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4;
  }
  writeF32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4;
  }
  writeF64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8;
  }
  writeU64(e) {
    this.ensureBufferSizeToWrite(8), H(this.view, this.pos, e), this.pos += 8;
  }
  writeI64(e) {
    this.ensureBufferSizeToWrite(8), P(this.view, this.pos, e), this.pos += 8;
  }
  writeBigUint64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, e), this.pos += 8;
  }
  writeBigInt64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, e), this.pos += 8;
  }
}
function N(n, e) {
  return new I(e).encodeSharedRef(n);
}
const f = Object.freeze({
  initializing: 1,
  waitingRobotType: 2,
  generatorMaking: 3,
  generatorReady: 4,
  slrmReady: 5
}), d = Object.freeze({
  dormant: 1,
  converged: 2,
  moving: 3,
  // Cartesian mode
  rewinding: 4,
  jMoving: 5
  // joint space mode
}), w = {
  url: null,
  socket: null,
  messageQueue: [],
  connect: function() {
    this.socket = new WebSocket(this.url), this.socket.onopen = () => {
      for (console.log("WebSocket connected"); this.messageQueue.length > 0; )
        this.socket.send(this.messageQueue.shift());
    }, this.socket.onclose = (n) => {
      console.log("webSocket closed, will retry...", n.code, n.reason), this.scheduleReconnect();
    }, this.socket.onerror = (n) => {
      console.error("WebSocket error", n), this.socket.close();
    };
  },
  reconnectTimer: null,
  scheduleReconnect: function() {
    this.reconnectTimer || (this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null, this.url && (console.log("Reconnecting..."), this.connect());
    }, 3e3));
  }
};
function k(n, e) {
  for (let t = 0; t < e.size(); ++t)
    e.set(t, n[t]);
}
function V(n, e, t) {
  for (let i = 0; i < e.length; ++i)
    e[i] = n.get(i);
}
class he {
  constructor(e, t) {
    this.jointLimitKeepMoving = !1, this.slrmModule = e, this.cdModule = t, this.state = f.initializing, this.subState = d.dormant, this.timeInterval = 4, this.logInterval = 0n / BigInt(this.timeInterval), this.noDestination = !0, this.exactSolution = !1, this.ignoreCollision = !1, this.ignoreJointLimits = !1, this.cmdVelGen = null, this.gjkCd = null, this.counter = 0n, this.jMoveGain = 10, this.jMoveVelocityLimit = Math.PI / 3, this.result_collision = [];
  }
  prepareVectors(e, t) {
    this.controllerTfVec = new Float64Array(t), this.controllerJointVec = new Float64Array(e), this.endLinkPoseVec = new Float64Array(t), this.jointRewinder = null, this.joints = new Float64Array(e), this.prevJoints = new Float64Array(e), this.velocities = new Float64Array(e), this.logPrevJoints = new Float64Array(e), this.jointUpperLimits = new Float64Array(e).fill(1e10), this.jointLowerLimits = new Float64Array(e).fill(-1e10), this.limitFlags = new Int32Array(e).fill(0);
  }
  setJointLimits(e, t) {
    if ((Array.isArray(e) || e instanceof Float64Array) && e.length !== this.joints.length) {
      console.error("setJointLimits: lowerLimits length mismatch");
      return;
    }
    if ((Array.isArray(t) || t instanceof Float64Array) && t.length !== this.joints.length) {
      console.error("setJointLimits: upperLimits length mismatch");
      return;
    }
    this.jointLowerLimits.set(e), this.jointUpperLimits.set(t);
  }
  prepareCmdVelGen(e, t = this.slrmModule) {
    this.cmdVelGen = e, this.slrmModule = t, this.SLRM_STAT = {};
    const i = this.SLRM_STAT;
    i.OK = t.CmdVelGeneratorStatus.OK.value, i.ERROR = t.CmdVelGeneratorStatus.ERROR.value, i.END = t.CmdVelGeneratorStatus.END.value, i.SINGULARITY = t.CmdVelGeneratorStatus.SINGULARITY.value, i.REWIND = t.CmdVelGeneratorStatus.REWIND.value, this.statusName = {
      [i.OK]: "OK",
      [i.ERROR]: "ERROR",
      [i.END]: "END",
      [i.SIMGILARITY]: "SINGULARITY",
      [i.REWIND]: "REWIND"
    }, Object.freeze(this.SLRM_STAT), Object.freeze(this.statusName), this.jointVec = new t.DoubleVector(), this.jointVec.resize(this.joints.length, 0), this.endLinkPose = new t.DoubleVector(), this.endLinkPose.resize(this.endLinkPoseVec.length, 0), this.emptyEndLinkPose = new t.DoubleVector(), this.emptyEndLinkPose.resize(0), this.limitFlagsWasm = new t.Int32Vector(), this.limitFlagsWasm.resize(this.joints.length, 0);
  }
  deleteSlrm() {
    this.jointVec && this.jointVec.delete(), this.endLinkPose && this.endLinkPose.delete(), this.emptyEndLinkPose && this.emptyEndLinkPose.delete(), this.limitFlagsWasm && this.limitFlagsWasm.delete();
  }
  prepareGjkCd(e, t = this.cdModule) {
    this.gjkCd = e, this.cdModule = t, this.jointPosition = new t.DoubleVector(), this.jointPosition.resize(this.joints.length, 0);
  }
  deleteGjkCd() {
    this.jointPosition && this.jointPosition.delete();
  }
  // ******** collision detection function ********
  detectCollisions(e, t) {
    if (!this.ignoreCollision && this.gjkCd) {
      k(e, this.jointPosition), this.gjkCd.calcFk(this.jointPosition);
      const i = this.gjkCd.testCollisionPairs();
      t.length = 0;
      const s = i.size();
      for (let o = 0; o < s; o++) {
        const l = i.get(o);
        t.push([l.first, l.second]);
      }
      return i.delete(), s;
    }
    return 0;
  }
  //
  doJointMove(e) {
    if (this.controllerJointVec && this.controllerJointVec.length === this.joints.length) {
      let t = !0;
      this.prevJoints.set(this.joints);
      for (let i = 0; i < this.joints.length; i++) {
        let s = this.jMoveGain * (this.controllerJointVec[i] - this.joints[i]);
        s < -this.jMoveVelocityLimit ? s = -this.jMoveVelocityLimit : s > this.jMoveVelocityLimit && (s = this.jMoveVelocityLimit), this.velocities[i] = s, this.prevJoints[i] = this.joints[i], this.joints[i] = this.joints[i] + this.velocities[i] * e;
        const o = this.controllerJointVec[i] - this.joints[i];
        (o < -0.01 || o > 0.01) && (t = !1);
      }
      return t && (this.subState = d.converged), !0;
    } else
      return console.error("controllerJointVec is not set properly for joint move"), !1;
  }
  doRewind(e) {
    const t = this.jointRewinder.map((o, l) => o.calcNext(this.joints[l], this.velocities[l], e));
    let i = !0;
    this.prevJoints.set(this.joints);
    for (let o = 0; o < this.joints.length; o++) {
      let l = t[o].x - this.joints[o];
      this.joints[o] = t[o].x, this.velocities[o] = t[o].v, (l < -0.01 || l > 0.01) && (i = !1);
    }
    i && (this.subState = d.converged);
    const s = w.socket;
    if (s) {
      const o = {
        topic: "actuator1",
        javascriptStamp: Date.now(),
        header: {},
        position: [...this.joints],
        velocity: [...this.velocities],
        normalized: []
      }, l = N(o);
      s.readyState === WebSocket.OPEN ? s.send(l) : w.url && (console.log("Not connected, queueing message"), w.messageQueue.push(o), (!s || s.readyState === WebSocket.CLOSED) && w.connect());
    }
    return i;
  }
  // ***** main function called in each loop *****
  step(e) {
    if (this.subState === d.dormant || !this.slrmModule) return;
    let t = this.noDestination, i = null, s = null;
    if (!this.cmdVelGen || !this.joints) return;
    this.state === f.slrmReady && (this.subState === d.moving || this.subState === d.jMoving || this.subState === d.rewinding) ? this.subState === d.moving && this.controllerTfVec && this.controllerTfVec.length === this.endLinkPoseVec.length ? this.endLinkPoseVec.set(this.controllerTfVec) : this.subState === d.jMoving && this.doJointMove(e) === !0 && (this.detectCollisions(this.joints, this.result_collision) !== 0 && (this.joints.set(this.prevJoints), this.subState = d.converged), t = !0) : this.subState === d.rewinding ? this.doRewind(e) === !0 && (t = !0) : t = !0, k(this.joints, this.jointVec), k(this.endLinkPoseVec, this.endLinkPose);
    let o = null;
    this.jointLimitKeepMoving ? (k(this.limitFlags, this.limitFlagsWasm), o = this.cmdVelGen.calcVelocityPQ2(
      this.jointVec,
      t ? this.emptyEndLinkPose : this.endLinkPose,
      this.limitFlagsWasm
    )) : o = this.cmdVelGen.calcVelocityPQ(
      this.jointVec,
      t ? this.emptyEndLinkPose : this.endLinkPose
    ), this.noDestination = !1, this.subState === d.moving && V(o.joint_velocities, this.velocities, this.slrmModule), o.joint_velocities.delete(), i = o.status.value, s = o.other;
    const l = new Float64Array(3), a = new Float64Array(4);
    if (V(o.position, l, this.slrmModule), V(o.quaternion, a, this.slrmModule), o.position.delete(), o.quaternion.delete(), this.subState === d.rewinding && o.status.value !== this.SLRM_STAT.END && o.status.value !== this.SLRM_STAT.OK && console.warn("CmdVelGenerator returned status other than END or OK during rewinding:", this.statusName[o.status.value]), this.subState === d.moving)
      switch (o.status.value) {
        case this.SLRM_STAT.OK:
          this.prevJoints.set(this.joints);
          for (let h = 0; h < this.joints.length; h++)
            this.joints[h] = this.joints[h] + this.velocities[h] * e;
          this.detectCollisions(this.joints, this.result_collision) !== 0 && this.joints.set(this.prevJoints);
          break;
        case this.SLRM_STAT.END:
          this.subState = d.converged;
          break;
        case this.SLRM_STAT.SIMGILARITY:
          console.error("CmdVelGenerator returned SINGULARITY status");
          break;
        case this.SLRM_STAT.REWIND:
          this.joints.set(this.prevJoints);
          break;
        case this.SLRM_STAT.ERROR:
          console.error("CmdVelGenerator returned ERROR status");
          break;
        default:
          console.error("Unknown status from CmdVelGenerator:", o.status.value);
          break;
      }
    if (i !== null && s !== null) {
      if (this.limitFlags.fill(0), !this.ignoreJointLimits) {
        let h = !1;
        for (let c = 0; c < this.joints.length; c++)
          this.joints[c] >= this.jointUpperLimits[c] && (this.limitFlags[c] = 1, this.prevJoints[c] = this.jointUpperLimits[c], h = !0), this.joints[c] <= this.jointLowerLimits[c] && (this.limitFlags[c] = -1, this.prevJoints[c] = this.jointLowerLimits[c], h = !0);
        h && (this.joints.set(this.prevJoints), this.jointLimitKeepMoving || (this.subState = d.converged));
      }
      if (self.postMessage({ type: "joints", joints: this.joints }), self.postMessage({
        type: "status",
        status: this.statusName[i],
        exact_solution: this.exactSolution,
        condition_number: s.condition_number,
        manipulability: s.manipulability,
        sensitivity_scale: s.sensitivity_scale,
        limit_flag: this.limitFlags,
        collisions: this.result_collision
      }), self.postMessage({
        type: "pose",
        position: l,
        quaternion: a
      }, [l.buffer, a.buffer]), this.counter++, this.logInterval !== 0n && this.counter % this.logInterval === 0n) {
        if (
          // this.logPrevJoints !== null && this.joints !== null &&
          this.logPrevJoints.length === this.joints.length
        ) {
          let h = 0;
          for (let c = 0; c < this.joints.length; c++) {
            const g = Math.abs(this.logPrevJoints[c] - this.joints[c]);
            g > h && (h = g);
          }
          h > 5e-3 && console.log(
            "counter:",
            this.counter,
            "status: ",
            this.statusName[i],
            " condition:",
            s.condition_number.toFixed(2),
            " m:",
            s.manipulability.toFixed(3),
            " k:",
            s.sensitivity_scale.toFixed(3) + `
limit flags: ` + this.limitFlag.join(", ")
          );
        }
        this.logPrevJoints.set(this.joints);
      }
    }
  }
}
let _ = null, J = !1;
console.debug("Now intended to import ModuleFactory");
const L = await import("/wasm/slrm_module.js"), fe = await import("/wasm/cd_module.js");
console.debug("ModuleFactory: ", L);
console.debug("ModuleFactory.default type:", typeof L.default);
if (typeof L.default != "function")
  throw console.error("ModuleFactory.default is not a function:", L.default), new Error("ModuleFactory.default is not a valid function");
const x = await L.default();
if (!x)
  throw console.error("Failed to load SlrmModule"), new Error("SlrmModule could not be loaded");
const S = await fe.default();
if (!S)
  throw console.error("Failed to load CdModule"), new Error("CdModule could not be loaded");
x.setJsLogLevel(2);
S.setJsLogLevel(2);
const r = new he(x, S);
console.debug("now setting onmessage");
self.onmessage = function(n) {
  const e = n.data;
  let t = r.cmdVelGen, i = r.gjkCd;
  switch (e.type) {
    case "shutdown":
      w.socket && (w.socket.close(), w.socket = null), x && (r.deleteSlrm(), x.delete()), S && (r.deleteCd(), S.delete()), self.postMessage({ type: "shutdown_complete" }), J = !0;
      break;
    case "set_slrm_loglevel":
      e?.logLevel && 0 <= e.logLevel && e.logLevel <= 4 && x.setJsLogLevel(e.logLevel);
      break;
    case "set_cd_loglevel":
      e?.logLevel && 0 <= e.logLevel && e.logLevel <= 4 && S.setJsLogLevel(e.logLevel);
      break;
    case "init":
      if (r.state === f.waitingRobotType) {
        r.state = f.generatorMaking, console.log("constructing CmdVelGenerator with :", e.filename), console.debug("URDF modifier file is", e.modifier);
        const { makeDoubleVector: s } = de(x), { makeCdDoubleVector: o, makeConvexShape: l } = ue(S);
        _ = s, fetch(e.filename).then((a) => a.json()).then((a) => {
          let h = !1, c = null;
          Array.isArray(a) ? (c = { ...a }, h = !0) : c = a, fetch(e.modifier).then((g) => g.json()).then((g) => {
            B(c, g), c = Object.values(c), h || (c = ge(c));
            const {
              jointModelVector: j,
              jointModelsArray: T
            } = C(x, c);
            if (console.debug("type of SlrmModule.CmdVelGen: " + typeof x.CmdVelGenerator), t = new x.CmdVelGenerator(j), T.forEach((u) => u.delete()), j.delete(), t == null) {
              console.error("generation of CmdVelGen instance failed"), t = null;
              return;
            }
            t != null && console.debug("CmdVelGen instance created:", t);
            const b = c.filter((u) => u.$.type === "revolute");
            r.prepareVectors(b.length, 16), r.prepareCmdVelGen(t);
            const v = [], U = [];
            b.forEach((u) => {
              v.push(u.limit.$.upper), U.push(u.limit.$.lower);
            }), r.setJointLimits(
              U,
              v
            ), console.debug(
              "jointLimits: ",
              v,
              U
            ), console.debug("Status Definitions: OK:" + r.SLRM_STAT?.OK + ", ERROR:" + r.SLRM_STAT?.ERROR + ", END:" + r.SLRM_STAT?.END + ", REWIND:" + r.SLRM_STAT?.REWIND + ", SINGULARITY:" + r.SLRM_STAT?.SINGULARITY), t?.setExactSolution(r.exactSolution), t?.setLinearVelocityLimit(200), t?.setAngularVelocityLimit(40 * Math.PI), t?.setAngularGain(100), t?.setLinearGain(100);
            const F = s(Array(b.length).fill(Math.PI * 2));
            if (t?.setJointVelocityLimit(F), F.delete(), e.linkShapes) {
              const {
                jointModelVector: u,
                jointModelsArray: p
              } = C(S, c), m = o([0, 0, 0]), y = o([1, 0, 0, 0]);
              i = new S.CollisionDetection(
                u,
                m,
                y
              ), u.delete(), p.forEach((E) => E.delete()), m.delete(), y.delete();
            }
            i && fetch(e.linkShapes).then((u) => u.json()).then(async (u) => {
              if (u.length !== b.length + 2) {
                u.length !== 0 && console.error(
                  "干渉形状定義の数",
                  u.length,
                  "がジョイントの数(+2 effector必須)",
                  b.length + 2,
                  "と一致しません。"
                );
                return;
              }
              console.log("linkShapes.length in", e.linkShapes, ": ", u.length);
              for (let p = 0; p < u.length; ++p) {
                const m = new S.ConvexShapeVector();
                for (const y of u[p]) {
                  const E = l(y);
                  m.push_back(E), E.delete();
                }
                i.addLinkShape(p, m), m.delete();
              }
              if (console.debug("setting up of link shapes is finished"), i.infoLinkShapes(), e.testPairs) {
                console.debug("recieve test pairs from", e.testPairs);
                const m = await (await fetch(e.testPairs)).json();
                i.clearTestPairs();
                for (const y of m)
                  i.addTestPair(y[0], y[1]);
              } else {
                const p = [];
                for (let m = 0; m < u.length - 4; m++)
                  for (let y = m + 2; y < u.length; y++)
                    p.push([m, y]);
                console.debug("using default test pairs: ", p), i.clearTestPairs();
                for (const m of p)
                  i.addTestPair(m[0], m[1]);
              }
              return i;
            }).then((u) => {
              r.prepareGjkCd(u);
            }).catch((u) => {
              console.error("Error fetching or parsing SHAPE file:", u);
            }), e.bridgeUrl && (console.debug("recieve bridge URL: ", e.bridgeUrl), w.url = e.bridgeUrl, w.connect()), r.state = f.generatorReady, self.postMessage({ type: "generator_ready" });
          }).catch((g) => {
            console.warn("Error fetching or parsing URDF modifier file:", g), console.warn("modifier file name:", e.modifier);
          });
        }).catch((a) => {
          console.error("Error fetching or parsing URDF.JSON file:", a);
        });
      }
      break;
    case "set_initial_joints":
      if ((r.state === f.generatorReady || r.state === f.slrmReady) && e.joints) {
        const s = new Float64Array(e.joints.length);
        s.set(e.joints), r.joints = s;
        const o = s.slice();
        r.initialjoints = o, r.prevJoints = s.slice(), console.debug("Setting initial joints:" + s.map((l) => (l * 57.2958).toFixed(1)).join(", ")), (!r.jointRewinder || s.length !== r.jointRewinder.length) && (r.jointRewinder = Array(s.length).fill(null).map((l, a) => a <= 1 ? new D(5, 1, 0.2, 0.02) : new D(5, 1, 1, 0.0625))), r.jointRewinder.forEach((l, a) => {
          l.reset(), l.setX0(o[a]);
        }), r.state = f.slrmReady, r.noDestination = !0, r.subState = d.moving, console.log("Worker state changed to slrmReady");
      }
      break;
    case "destination":
      r.state === f.slrmReady && r.subState !== d.rewinding && r.subState !== d.jMoving && e.endLinkPose && (r.controllerTfVec.set(e.endLinkPose), console.debug("Received destination: " + r.controllerTfVec[12].toFixed(3) + ", " + r.controllerTfVec[13].toFixed(3) + ", " + r.controllerTfVec[14].toFixed(3)), r.subState = d.moving);
      break;
    case "set_joint_targets":
      e.jointTargets && r.state === f.slrmReady && r.subState !== d.rewinding && r.subState !== d.moving ? e.jointTargets.length === r.joints.length ? (r.controllerJointVec.set(e.jointTargets), r.subState = d.jMoving) : console.error(
        "set_joint_targets: jointTargets length mismatch:",
        e.jointTargets.length,
        "vs",
        r.joints.length
      ) : (console.warn("Ignored set_joint_targets command."), console.warn("set_joint_targets: invalid state or missing jointTargets"), console.warn("  calcObj.state:", r.state, " calcObj.subState:", r.subState));
      break;
    case "slow_rewind":
      r.state === f.slrmReady && r.jointRewinder && (e.slowRewind == !0 ? r.subState = d.rewinding : r.subState = d.converged);
      break;
    case "set_end_effector_point":
    case "set_end_effector_position":
    case "set_end_effector_orientation":
    case "set_end_effector_pose":
      if (_) {
        if (e.endEffectorPoint && e.endEffectorPoint.length === 3 && typeof e.endEffectorPoint[0] == "number" && typeof e.endEffectorPoint[1] == "number" && typeof e.endEffectorPoint[2] == "number") {
          const o = _(e.endEffectorPoint);
          t?.setEndEffectorPosition(o), o.delete();
        }
        if (e.endEffectorQuaternion && e.endEffectorQuaternion.length === 4 && typeof e.endEffectorQuaternion[0] == "number" && typeof e.endEffectorQuaternion[1] == "number" && typeof e.endEffectorQuaternion[2] == "number" && typeof e.endEffectorQuaternion[3] == "number") {
          const o = [
            e.endEffectorQuaternion[3],
            e.endEffectorQuaternion[0],
            e.endEffectorQuaternion[1],
            e.endEffectorQuaternion[2]
          ], l = _(o);
          t?.setEndEffectorOrientation(l), l.delete();
        }
        const s = r.subState;
        r.subState = d.moving, r.noDestination = !0, r.step(0), r.subState = s;
      }
      break;
    case "set_exact_solution":
      (r.state === f.generatorReady || r.state === f.slrmReady) && e.exactSolution !== void 0 && (e.exactSolution === !0 ? r.exactSolution = !0 : r.exactSolution = !1, t?.setExactSolution(r.exactSolution), console.log(
        "Exact solution for singularity set to: ",
        r.exactSolution
      ));
      break;
    case "set_joint_weights":
      (r.state === f.generatorReady || r.state === f.slrmReady) && e.jointNumber !== void 0 && e.jointWeight !== void 0 && t?.setJointWeight && t?.setJointWeight(e.jointNumber, e.jointWeight) !== !0 && console.error(
        "set_joint_weights: failed to set weight for joint number ",
        e.jointNumber
      );
      break;
    case "set_joint_desirable_vlimit":
      (r.state === f.generatorReady || r.state === f.slrmReady) && (e.jointNumber === void 0 && (e.jointNumber = -1), e.velocityLimit !== void 0 && t?.setJointDesirableVelocityLimit && t?.setJointDesirableVelocityLimit(
        e.jointNumber,
        e.velocityLimit
      ) !== !0 && console.error(
        "set_joint_desirable_vlimit: failed to set desirable velocity limit for joint number ",
        e.jointNumber
      ));
      break;
    case "clear_joint_desirable":
      (r.state === f.generatorReady || r.state === f.slrmReady) && e.jointNumber !== void 0 && t?.setJointDesirable && t?.setJointDesirable(e.jointNumber, !1) !== !0 && console.error(
        "clear_joint_desirable: failed to clear desirable for joint number ",
        e.jointNumber
      );
      break;
    case "set_joint_desirable":
      console.debug("in worker, set_joint_desirable called:", e), (r.state === f.generatorReady || r.state === f.slrmReady) && e.jointNumber !== void 0 && e.lower !== void 0 && e.upper !== void 0 && e.gain !== void 0 && (console.debug(
        "in worker, set_joint_desirable: jointNumber=",
        e.jointNumber,
        " lower=",
        e.lower,
        " upper=",
        e.upper,
        " gain=",
        e.gain
      ), t?.setJointDesirable && t?.setJointDesirable(
        e.jointNumber,
        !0,
        e.lower,
        e.upper,
        e.gain
      ) !== !0 && console.error(
        "set_joint_desirable: failed to set desirable for joint number ",
        e.jointNumber
      ));
      break;
    case "set_joint_velocity_limit":
      if (r.state === f.generatorReady || r.state === f.slrmReady)
        if (e.velocityLimit !== void 0) {
          const s = _(e.velocityLimit);
          t?.setJointVelocityLimitSingle(s) !== !0 && console.error("set_joint_velocity_limit: failed to set joint velocity limit"), s.delete();
        } else
          console.error("set_joint_velocity_limit: velocityLimit is undefined");
      break;
    case "set_ignore_collisions":
      (r.state === f.generatorReady || r.state === f.slrmReady) && e.ignoreCollisions !== void 0 && (r.ignoreCollision = e.ignoreCollisions, console.log(
        "Ignore collisions set to: ",
        r.ignoreCollision
      ));
      break;
    case "set_ignore_joint_limits":
      (r.state === f.generatorReady || r.state === f.slrmReady) && e.ignoreJointLimits !== void 0 && (r.ignoreJointLimits = e.ignoreJointLimits, console.log("Ignore joint limits set to: ", r.ignoreJointLimits));
      break;
  }
};
function z(n = performance.now() - r.timeInterval) {
  const e = performance.now(), t = e - n;
  if (r.step(t / 1e3), J === !0) {
    self.postMessage({ type: "shutdown_complete" }), console.log("main loop was finished"), self.close();
    return;
  }
  if (w.socket) {
    const s = performance.now() - e, o = Math.floor(s / 1e3), l = Math.floor((s - o * 1e3) * 1e6), a = {
      topic: "timeRef",
      javascriptStamp: Date.now(),
      header: { frame_id: "none" },
      time_ref: {
        sec: o,
        nanosec: l
      },
      source: "slrm_and_cd"
    }, h = N(a);
    w.socket.readyState === WebSocket.OPEN && w.socket.send(h);
  }
  setTimeout(() => z(e), 0);
}
r.state = f.waitingRobotType;
self.postMessage({ type: "ready" });
z();
function de(n) {
  function e(t) {
    const i = new n.DoubleVector();
    for (let s = 0; s < t.length; ++s)
      i.push_back(t[s]);
    return i;
  }
  return {
    makeDoubleVector: e
    // ... more helpers
  };
}
function ue(n) {
  function e(i) {
    const s = new n.DoubleVector();
    for (let o = 0; o < i.length; ++o)
      s.push_back(i[o]);
    return s;
  }
  function t(i) {
    const s = new n.ConvexShape();
    for (let o = 0; o < i.length; ++o) {
      const l = i[o];
      s.push_back({ x: l[0], y: l[1], z: l[2] });
    }
    return s;
  }
  return {
    makeCdDoubleVector: e,
    makeConvexShape: t
  };
}
function C(n, e) {
  function t(a, h) {
    const c = new a.DoubleVector();
    for (let g = 0; g < h.length; ++g)
      c.push_back(h[g]);
    return c;
  }
  function i(a, h) {
    const c = new a.JointModelFlatStructVector();
    for (let g = 0; g < h.length; ++g)
      c.push_back(h[g]);
    return c;
  }
  const s = {
    revolute: n.JointType.Revolute,
    continuous: n.JointType.Continuous,
    prismatic: n.JointType.Prismatic,
    fixed: n.JointType.Fixed,
    floating: n.JointType.Floating,
    planar: n.JointType.Planar
  }, o = e.map((a) => {
    const h = a.origin.$.xyz ?? [0, 0, 0], c = t(
      n,
      Array.isArray(h) && h.length === 3 ? h : [0, 0, 0]
    ), g = a.origin.$.rpy ?? [0, 0, 0], j = t(
      n,
      Array.isArray(g) && g.length === 3 ? g : [0, 0, 0]
    ), T = a.axis?.$?.xyz ?? [0, 0, 1], b = t(
      n,
      Array.isArray(T) && T.length === 3 ? T : [0, 0, 1]
    );
    let v = s[a.$?.type];
    v || (console.error(
      "Unknown joint type string:",
      a.$?.type,
      "setting to fixed"
    ), v = s.fixed);
    const U = new n.JointModelFlatStruct(b, c, j, v);
    return b.delete(), c.delete(), j.delete(), U;
  });
  return { jointModelVector: i(n, o), jointModelsArray: o };
}
function ge(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  n.forEach((l) => {
    const a = l.parent.$.link, h = l.child.$.link;
    e.has(a) || e.set(a, []), e.get(a).push(l), t.set(h, (t.get(h) || 0) + 1), t.has(a) || t.set(a, 0), i.set(h, l);
  });
  const s = [];
  for (const [l, a] of t.entries())
    a === 0 && s.push(l);
  const o = [];
  for (; s.length > 0; ) {
    const l = s.shift(), a = e.get(l) || [];
    for (const h of a) {
      const c = h.child.$.link;
      o.push(h), t.set(c, t.get(c) - 1), t.get(c) === 0 && s.push(c);
    }
  }
  return o.length !== n.length && console.warn("Cycle detected or disconnected components in URDF joints"), o;
}
function B(n, e) {
  for (const t in e) {
    if (!(t in n)) {
      console.debug("key in update.json:", t, " ignored");
      continue;
    }
    const i = e[t], s = n[t];
    i !== null && typeof i == "object" && !Array.isArray(i) && s !== null && typeof s == "object" && !Array.isArray(s) ? B(s, i) : (console.warn("key:", t, "val:", n[t], "is replaced by", i), n[t] = i);
  }
  return n;
}
