const M = () => {
}, z = {
  debug: M,
  log: M,
  warn: M,
  error: M
};
class J {
  constructor(e, t, i, s) {
    this.g1 = e, this.a1 = t, this.v1 = i, this.a2 = s, this.constrained = !1, this.x0 = 0;
  }
  #e(e) {
    const t = this.a1, i = this.v1, s = this.g1, o = e * e;
    let l = 0;
    return o < ((c) => c * c)(t / (s * s)) ? l = -s * e : o < ((c) => c * c)(t / (2 * s * s) + i * i / (2 * t)) ? l = -Math.sqrt(t * (2 * Math.abs(e) - t / (s * s))) * Math.sign(e) : l = -i * Math.sign(e), l;
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
function $(n) {
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
function H(n, e, t) {
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
        const c = n.charCodeAt(o);
        (c & 64512) === 56320 && (++o, l = ((l & 1023) << 10) + (c & 1023) + 65536);
      }
      (l & 4294901760) === 0 ? (e[s++] = l >> 12 & 15 | 224, e[s++] = l >> 6 & 63 | 128) : (e[s++] = l >> 18 & 7 | 240, e[s++] = l >> 12 & 63 | 128, e[s++] = l >> 6 & 63 | 128);
    }
    e[s++] = l & 63 | 128;
  }
}
const q = new TextEncoder(), Y = 50;
function X(n, e, t) {
  q.encodeInto(n, e.subarray(t));
}
function Z(n, e, t) {
  n.length > Y ? X(n, e, t) : H(n, e, t);
}
new TextDecoder();
class V {
  constructor(e, t) {
    this.type = e, this.data = t;
  }
}
class I extends Error {
  constructor(e) {
    super(e);
    const t = Object.create(I.prototype);
    Object.setPrototypeOf(this, t), Object.defineProperty(this, "name", {
      configurable: !0,
      enumerable: !1,
      value: I.name
    });
  }
}
function ee(n, e, t) {
  const i = t / 4294967296, s = t;
  n.setUint32(e, i), n.setUint32(e + 4, s);
}
function B(n, e, t) {
  const i = Math.floor(t / 4294967296), s = t;
  n.setUint32(e, i), n.setUint32(e + 4, s);
}
function te(n, e) {
  const t = n.getInt32(e), i = n.getUint32(e + 4);
  return t * 4294967296 + i;
}
const ie = -1, se = 4294967296 - 1, ne = 17179869184 - 1;
function oe({ sec: n, nsec: e }) {
  if (n >= 0 && e >= 0 && n <= ne)
    if (e === 0 && n <= se) {
      const t = new Uint8Array(4);
      return new DataView(t.buffer).setUint32(0, n), t;
    } else {
      const t = n / 4294967296, i = n & 4294967295, s = new Uint8Array(8), o = new DataView(s.buffer);
      return o.setUint32(0, e << 2 | t & 3), o.setUint32(4, i), s;
    }
  else {
    const t = new Uint8Array(12), i = new DataView(t.buffer);
    return i.setUint32(0, e), B(i, 4, n), t;
  }
}
function re(n) {
  const e = n.getTime(), t = Math.floor(e / 1e3), i = (e - t * 1e3) * 1e6, s = Math.floor(i / 1e9);
  return {
    sec: t + s,
    nsec: i - s * 1e9
  };
}
function le(n) {
  if (n instanceof Date) {
    const e = re(n);
    return oe(e);
  } else
    return null;
}
function ae(n) {
  const e = new DataView(n.buffer, n.byteOffset, n.byteLength);
  switch (n.byteLength) {
    case 4:
      return { sec: e.getUint32(0), nsec: 0 };
    case 8: {
      const t = e.getUint32(0), i = e.getUint32(4), s = (t & 3) * 4294967296 + i, o = t >>> 2;
      return { sec: s, nsec: o };
    }
    case 12: {
      const t = te(e, 4), i = e.getUint32(0);
      return { sec: t, nsec: i };
    }
    default:
      throw new I(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${n.length}`);
  }
}
function ce(n) {
  const e = ae(n);
  return new Date(e.sec * 1e3 + e.nsec / 1e6);
}
const he = {
  type: ie,
  encode: le,
  decode: ce
};
class C {
  constructor() {
    this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(he);
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
          return new V(l, o);
        }
      }
    }
    for (let i = 0; i < this.encoders.length; i++) {
      const s = this.encoders[i];
      if (s != null) {
        const o = s(e, t);
        if (o != null) {
          const l = i;
          return new V(l, o);
        }
      }
    }
    return e instanceof V ? e : null;
  }
  decode(e, t, i) {
    const s = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
    return s ? s(e, t, i) : new V(t, e);
  }
}
C.defaultCodec = new C();
function fe(n) {
  return n instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && n instanceof SharedArrayBuffer;
}
function de(n) {
  return n instanceof Uint8Array ? n : ArrayBuffer.isView(n) ? new Uint8Array(n.buffer, n.byteOffset, n.byteLength) : fe(n) ? new Uint8Array(n) : Uint8Array.from(n);
}
const ue = 100, ge = 2048;
class D {
  constructor(e) {
    this.entered = !1, this.extensionCodec = e?.extensionCodec ?? C.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.maxDepth = e?.maxDepth ?? ue, this.initialBufferSize = e?.initialBufferSize ?? ge, this.sortKeys = e?.sortKeys ?? !1, this.forceFloat32 = e?.forceFloat32 ?? !1, this.ignoreUndefined = e?.ignoreUndefined ?? !1, this.forceIntegerToFloat = e?.forceIntegerToFloat ?? !1, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new D({
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
    const i = $(e);
    this.ensureBufferSizeToWrite(5 + i), this.writeStringHeader(i), Z(e, this.bytes, this.pos), this.pos += i;
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
    const i = de(e);
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
    this.ensureBufferSizeToWrite(8), ee(this.view, this.pos, e), this.pos += 8;
  }
  writeI64(e) {
    this.ensureBufferSizeToWrite(8), B(this.view, this.pos, e), this.pos += 8;
  }
  writeBigUint64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, e), this.pos += 8;
  }
  writeBigInt64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, e), this.pos += 8;
  }
}
function W(n, e) {
  return new D(e).encodeSharedRef(n);
}
const d = Object.freeze({
  initializing: 1,
  waitingRobotType: 2,
  generatorMaking: 3,
  generatorReady: 4,
  slrmReady: 5
}), u = Object.freeze({
  dormant: 1,
  converged: 2,
  moving: 3,
  // Cartesian mode
  rewinding: 4,
  jMoving: 5
  // joint space mode
}), p = {
  url: null,
  socket: null,
  messageQueue: [],
  connect: function() {
    this.socket = new WebSocket(this.url), this.socket.onopen = () => {
      for (globalThis.__customLogger?.log("WebSocket connected"); this.messageQueue.length > 0; )
        this.socket.send(this.messageQueue.shift());
    }, this.socket.onclose = (n) => {
      globalThis.__customLogger?.log("webSocket closed, will retry...", n.code, n.reason), this.scheduleReconnect();
    }, this.socket.onerror = (n) => {
      globalThis.__customLogger?.error("WebSocket error", n), this.socket.close();
    };
  },
  reconnectTimer: null,
  scheduleReconnect: function() {
    this.reconnectTimer || (this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null, this.url && (globalThis.__customLogger?.log("Reconnecting..."), this.connect());
    }, 3e3));
  }
};
globalThis.__customLogger = z;
const S = globalThis.__customLogger;
function A(n, e) {
  for (let t = 0; t < e.size(); ++t)
    e.set(t, n[t]);
}
function F(n, e) {
  for (let t = 0; t < e.length; ++t)
    e[t] = n.get(t);
}
class me {
  constructor(e, t, i) {
    this.jointLimitKeepMoving = !1, this.slrmModule = e, this.cdModule = t, this._cmdQueue = i, this.state = d.initializing, this.subState = u.dormant, this.timeInterval = 4, this.logInterval = 0n / BigInt(this.timeInterval), this.noDestination = !0, this.exactSolution = !1, this.ignoreCollision = !1, this.ignoreJointLimits = !1, this.cmdVelGen = null, this.gjkCd = null, this.counter = 0n, this.jMoveGain = 10, this.jMoveVelocityLimit = Math.PI / 3, this.result_collision = [];
  }
  prepareVectors(e, t) {
    this.controllerTfVec = new Float64Array(t), this.controllerJointVec = new Float64Array(e), this.endLinkPoseVec = new Float64Array(t), this.jointRewinder = null, this.joints = new Float64Array(e), this.prevJoints = new Float64Array(e), this.velocities = new Float64Array(e), this.logPrevJoints = new Float64Array(e), this.jointUpperLimits = new Float64Array(e).fill(1e10), this.jointLowerLimits = new Float64Array(e).fill(-1e10), this.limitFlags = new Int32Array(e).fill(0);
  }
  setJointLimits(e, t) {
    if ((Array.isArray(e) || e instanceof Float64Array) && e.length !== this.joints.length) {
      S?.error("setJointLimits: lowerLimits length mismatch");
      return;
    }
    if ((Array.isArray(t) || t instanceof Float64Array) && t.length !== this.joints.length) {
      S?.error("setJointLimits: upperLimits length mismatch");
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
      A(e, this.jointPosition), this.gjkCd.calcFk(this.jointPosition);
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
      return t && (this.subState = u.converged), !0;
    } else
      return S?.error("controllerJointVec is not set properly for joint move"), !1;
  }
  doRewind(e) {
    const t = this.jointRewinder.map((o, l) => o.calcNext(this.joints[l], this.velocities[l], e));
    let i = !0;
    this.prevJoints.set(this.joints);
    for (let o = 0; o < this.joints.length; o++) {
      let l = t[o].x - this.joints[o];
      this.joints[o] = t[o].x, this.velocities[o] = t[o].v, (l < -0.01 || l > 0.01) && (i = !1);
    }
    i && (this.subState = u.converged);
    const s = p.socket;
    if (s) {
      const o = {
        topic: "actuator1",
        javascriptStamp: Date.now(),
        header: {},
        position: [...this.joints],
        velocity: [...this.velocities],
        normalized: []
      }, l = W(o);
      s.readyState === WebSocket.OPEN ? s.send(l) : p.url && (S?.log("Not connected, queueing message"), p.messageQueue.push(o), (!s || s.readyState === WebSocket.CLOSED) && p.connect());
    }
    return i;
  }
  // ***** main function called in each loop *****
  step(e) {
    if (this.subState === u.dormant || !this.slrmModule) return;
    let t = this.noDestination, i = null, s = null;
    if (!this.cmdVelGen || !this.joints) return;
    this.state === d.slrmReady && (this.subState === u.moving || this.subState === u.jMoving || this.subState === u.rewinding) ? this.subState === u.moving && this.controllerTfVec && this.controllerTfVec.length === this.endLinkPoseVec.length ? this.endLinkPoseVec.set(this.controllerTfVec) : this.subState === u.jMoving && this.doJointMove(e) === !0 && (this.detectCollisions(this.joints, this.result_collision) !== 0 && (this.joints.set(this.prevJoints), this.subState = u.converged), t = !0) : this.subState === u.rewinding ? this.doRewind(e) === !0 && (t = !0) : t = !0, A(this.joints, this.jointVec), A(this.endLinkPoseVec, this.endLinkPose);
    let o = null;
    this.jointLimitKeepMoving ? (A(this.limitFlags, this.limitFlagsWasm), o = this.cmdVelGen.calcVelocityPQ2(
      this.jointVec,
      t ? this.emptyEndLinkPose : this.endLinkPose,
      this.limitFlagsWasm
    )) : o = this.cmdVelGen.calcVelocityPQ(
      this.jointVec,
      t ? this.emptyEndLinkPose : this.endLinkPose
    ), this.noDestination = !1, this.subState === u.moving && F(o.joint_velocities, this.velocities), o.joint_velocities.delete(), i = o.status.value, s = o.other;
    const l = new Float64Array(3), c = new Float64Array(4);
    if (F(o.position, l), F(o.quaternion, c), o.position.delete(), o.quaternion.delete(), this.subState === u.rewinding && o.status.value !== this.SLRM_STAT.END && o.status.value !== this.SLRM_STAT.OK && S?.warn("CmdVelGenerator returned status other than END or OK during rewinding:", this.statusName[o.status.value]), this.subState === u.moving)
      switch (o.status.value) {
        case this.SLRM_STAT.OK:
          this.prevJoints.set(this.joints);
          for (let f = 0; f < this.joints.length; f++)
            this.joints[f] = this.joints[f] + this.velocities[f] * e;
          this.detectCollisions(this.joints, this.result_collision) !== 0 && this.joints.set(this.prevJoints);
          break;
        case this.SLRM_STAT.END:
          this.subState = u.converged;
          break;
        case this.SLRM_STAT.SIMGILARITY:
          S?.error("CmdVelGenerator returned SINGULARITY status");
          break;
        case this.SLRM_STAT.REWIND:
          this.joints.set(this.prevJoints);
          break;
        case this.SLRM_STAT.ERROR:
          S?.error("CmdVelGenerator returned ERROR status");
          break;
        default:
          S?.error("Unknown status from CmdVelGenerator:", o.status.value);
          break;
      }
    if (i !== null && s !== null) {
      if (this.limitFlags.fill(0), !this.ignoreJointLimits) {
        let f = !1;
        for (let h = 0; h < this.joints.length; h++)
          this.joints[h] >= this.jointUpperLimits[h] && (this.limitFlags[h] = 1, this.joints[h] = this.prevJoints[h], this.prevJoints[h] = this.jointUpperLimits[h], f = !0), this.joints[h] <= this.jointLowerLimits[h] && (this.limitFlags[h] = -1, this.joints[h] = this.prevJoints[h], this.prevJoints[h] = this.jointLowerLimits[h], f = !0);
        f && (this.jointLimitKeepMoving || (this.joints.set(this.prevJoints), this.subState = u.converged));
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
        quaternion: c
      }, [l.buffer, c.buffer]), this.subState === u.converged && this._cmdQueue.length > 0) {
        const f = this._cmdQueue.shift();
        f.type === "jMove" && (this.controllerJointVec.set(f.joints), this.subState = u.jMoving);
      }
      if (this.counter++, this.logInterval !== 0n && this.counter % this.logInterval === 0n) {
        if (
          // this.logPrevJoints !== null && this.joints !== null &&
          this.logPrevJoints.length === this.joints.length
        ) {
          let f = 0;
          for (let h = 0; h < this.joints.length; h++) {
            const m = Math.abs(this.logPrevJoints[h] - this.joints[h]);
            m > f && (f = m);
          }
          f > 5e-3 && S?.log(
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
globalThis.__customLogger = z;
const a = globalThis.__customLogger;
let k = null, O = !1;
typeof console.log == "function" && (a.log = console.log);
typeof console.warn == "function" && (a.warn = console.warn);
typeof console.error == "function" && (a.error = console.error);
a?.debug("Now intended to import ModuleFactory");
const E = await import("/wasm/slrm_module.js"), we = await import("/wasm/cd_module.js");
a?.debug("ModuleFactory: ", E);
a?.debug("ModuleFactory.default type:", typeof E.default);
if (typeof E.default != "function")
  throw a?.error("ModuleFactory.default is not a function:", E.default), new Error("ModuleFactory.default is not a valid function");
const v = await E.default();
if (!v)
  throw a?.error("Failed to load SlrmModule"), new Error("SlrmModule could not be loaded");
const x = await we.default();
if (!x)
  throw a?.error("Failed to load CdModule"), new Error("CdModule could not be loaded");
v.setJsLogLevel(2);
x.setJsLogLevel(2);
const G = [], r = new me(v, x, G);
a?.debug("now setting onmessage");
self.onmessage = function(n) {
  const e = n.data;
  let t = r.cmdVelGen, i = r.gjkCd;
  switch (e.type) {
    case "shutdown":
      p.socket && (p.socket.close(), p.socket = null), v && (r.deleteSlrm(), v.delete()), x && (r.deleteCd(), x.delete()), self.postMessage({ type: "shutdown_complete" }), O = !0;
      break;
    case "set_worker_loglevel":
      if (e?.logLevel && 0 <= e.logLevel && e.logLevel <= 4) {
        let s = 0;
        switch (e.logLevel) {
          case 0:
            break;
          case 1:
            s = 1;
            break;
          // error
          case 2:
            s = 3;
            break;
          // warn
          case 3:
            s = 7;
            break;
          // info
          case 4:
            s = 15;
            break;
          // debug
          default:
            s = 3;
            break;
        }
        s & 1 ? a.error = console.error : a.error = () => {
        }, s & 2 ? a.warn = console.warn : a.warn = () => {
        }, s & 4 ? a.log = console.log : a.log = () => {
        }, s & 8 ? a.debug = console.debug : a.debug = () => {
        }, a?.log("Worker log level set to", e.logLevel);
      }
      break;
    case "set_slrm_loglevel":
      e?.logLevel && 0 <= e.logLevel && e.logLevel <= 4 && v.setJsLogLevel(e.logLevel);
      break;
    case "set_cd_loglevel":
      e?.logLevel && 0 <= e.logLevel && e.logLevel <= 4 && x.setJsLogLevel(e.logLevel);
      break;
    case "init":
      if (r.state === d.waitingRobotType) {
        r.state = d.generatorMaking, a?.log("constructing CmdVelGenerator with :", e.filename), a?.debug("URDF modifier file is", e.modifier);
        const { makeDoubleVector: s } = pe(v), { makeCdDoubleVector: o, makeConvexShape: l } = ye(x);
        k = s, fetch(e.filename).then((c) => c.json()).then((c) => {
          let f = !1, h = null;
          Array.isArray(c) ? (h = { ...c }, f = !0) : h = c, fetch(e.modifier).then((m) => m.json()).then((m) => {
            Q(h, m), h = Object.values(h), f || (h = be(h));
            const {
              jointModelVector: T,
              jointModelsArray: L
            } = N(v, h);
            if (a?.debug("type of SlrmModule.CmdVelGen: " + typeof v.CmdVelGenerator), t = new v.CmdVelGenerator(T), L.forEach((g) => g.delete()), T.delete(), t == null) {
              a?.error("generation of CmdVelGen instance failed"), t = null;
              return;
            }
            t != null && a?.debug("CmdVelGen instance created:", t);
            const j = h.filter((g) => g.$.type === "revolute");
            r.prepareVectors(j.length, 16), r.prepareCmdVelGen(t);
            const _ = [], U = [];
            j.forEach((g) => {
              _.push(g.limit.$.upper), U.push(g.limit.$.lower);
            }), r.setJointLimits(
              U,
              _
            ), a?.debug(
              "jointLimits: ",
              _,
              U
            ), a?.debug("Status Definitions: OK:" + r.SLRM_STAT?.OK + ", ERROR:" + r.SLRM_STAT?.ERROR + ", END:" + r.SLRM_STAT?.END + ", REWIND:" + r.SLRM_STAT?.REWIND + ", SINGULARITY:" + r.SLRM_STAT?.SINGULARITY), t?.setExactSolution(r.exactSolution), t?.setLinearVelocityLimit(200), t?.setAngularVelocityLimit(40 * Math.PI), t?.setAngularGain(100), t?.setLinearGain(100);
            const P = s(Array(j.length).fill(Math.PI * 2));
            if (t?.setJointVelocityLimit(P), P.delete(), e.linkShapes) {
              const {
                jointModelVector: g,
                jointModelsArray: y
              } = N(x, h), w = o([0, 0, 0]), b = o([1, 0, 0, 0]);
              i = new x.CollisionDetection(
                g,
                w,
                b
              ), g.delete(), y.forEach((R) => R.delete()), w.delete(), b.delete();
            }
            i && fetch(e.linkShapes).then((g) => g.json()).then(async (g) => {
              if (g.length !== j.length + 2) {
                g.length !== 0 && a?.error(
                  "干渉形状定義の数",
                  g.length,
                  "がジョイントの数(+2 effector必須)",
                  j.length + 2,
                  "と一致しません。"
                );
                return;
              }
              a?.log("linkShapes.length in", e.linkShapes, ": ", g.length);
              for (let y = 0; y < g.length; ++y) {
                const w = new x.ConvexShapeVector();
                for (const b of g[y]) {
                  const R = l(b);
                  w.push_back(R), R.delete();
                }
                i.addLinkShape(y, w), w.delete();
              }
              if (a?.debug("setting up of link shapes is finished"), i.infoLinkShapes(), e.testPairs) {
                a?.debug("recieve test pairs from", e.testPairs);
                const w = await (await fetch(e.testPairs)).json();
                i.clearTestPairs();
                for (const b of w)
                  i.addTestPair(b[0], b[1]);
              } else {
                const y = [];
                for (let w = 0; w < g.length - 4; w++)
                  for (let b = w + 2; b < g.length; b++)
                    y.push([w, b]);
                a?.debug("using default test pairs: ", y), i.clearTestPairs();
                for (const w of y)
                  i.addTestPair(w[0], w[1]);
              }
              return i;
            }).then((g) => {
              r.prepareGjkCd(g);
            }).catch((g) => {
              a?.error("Error fetching or parsing SHAPE file:", g);
            }), e.bridgeUrl && (a?.debug("recieve bridge URL: ", e.bridgeUrl), p.url = e.bridgeUrl, p.connect()), r.state = d.generatorReady, self.postMessage({ type: "generator_ready" });
          }).catch((m) => {
            a?.warn("Error fetching or parsing URDF modifier file:", m), a?.warn("modifier file name:", e.modifier);
          });
        }).catch((c) => {
          a?.error("Error fetching or parsing URDF.JSON file:", c);
        });
      }
      break;
    case "set_initial_joints":
      if ((r.state === d.generatorReady || r.state === d.slrmReady) && e.joints) {
        const s = new Float64Array(e.joints.length);
        s.set(e.joints), r.joints = s;
        const o = s.slice();
        r.initialjoints = o, r.prevJoints = s.slice(), a?.debug("Setting initial joints:" + s.map((l) => (l * 57.2958).toFixed(1)).join(", ")), (!r.jointRewinder || s.length !== r.jointRewinder.length) && (r.jointRewinder = Array(s.length).fill(null).map((l, c) => c <= 1 ? new J(5, 1, 0.2, 0.02) : new J(5, 1, 1, 0.0625))), r.jointRewinder.forEach((l, c) => {
          l.reset(), l.setX0(o[c]);
        }), r.state = d.slrmReady, r.noDestination = !0, r.subState = u.moving, a?.log("Worker state changed to slrmReady");
      }
      break;
    case "destination":
      r.state === d.slrmReady && r.subState !== u.rewinding && r.subState !== u.jMoving && e.endLinkPose && (r.controllerTfVec.set(e.endLinkPose), a?.debug("Received destination: " + r.controllerTfVec[12].toFixed(3) + ", " + r.controllerTfVec[13].toFixed(3) + ", " + r.controllerTfVec[14].toFixed(3)), r.subState = u.moving);
      break;
    case "set_joint_targets":
      if (e.jointTargets && r.state === d.slrmReady)
        if (r.subState !== u.rewinding && r.subState !== u.moving)
          e.jointTargets.length === r.joints.length ? (r.controllerJointVec.set(e.jointTargets), r.subState = u.jMoving) : a?.error(
            "set_joint_targets: jointTargets length mismatch:",
            e.jointTargets.length,
            "vs",
            r.joints.length
          );
        else {
          const s = { type: "jMove", joints: e.jointTargets };
          G.push(s);
        }
      else
        a?.warn("Ignored set_joint_targets command."), a?.warn("set_joint_targets: invalid state or missing jointTargets"), a?.warn("  calcObj.state:", r.state, " calcObj.subState:", r.subState);
      break;
    case "slow_rewind":
      r.state === d.slrmReady && r.jointRewinder && (e.slowRewind == !0 ? r.subState = u.rewinding : r.subState = u.converged);
      break;
    case "set_end_effector_point":
    case "set_end_effector_position":
    case "set_end_effector_orientation":
    case "set_end_effector_pose":
      if (k) {
        if (e.endEffectorPoint && e.endEffectorPoint.length === 3 && typeof e.endEffectorPoint[0] == "number" && typeof e.endEffectorPoint[1] == "number" && typeof e.endEffectorPoint[2] == "number") {
          const o = k(e.endEffectorPoint);
          t?.setEndEffectorPosition(o), o.delete();
        }
        if (e.endEffectorQuaternion && e.endEffectorQuaternion.length === 4 && typeof e.endEffectorQuaternion[0] == "number" && typeof e.endEffectorQuaternion[1] == "number" && typeof e.endEffectorQuaternion[2] == "number" && typeof e.endEffectorQuaternion[3] == "number") {
          const o = [
            e.endEffectorQuaternion[3],
            e.endEffectorQuaternion[0],
            e.endEffectorQuaternion[1],
            e.endEffectorQuaternion[2]
          ], l = k(o);
          t?.setEndEffectorOrientation(l), l.delete();
        }
        const s = r.subState;
        r.subState = u.moving, r.noDestination = !0, r.step(0), r.subState = s;
      }
      break;
    case "set_exact_solution":
      (r.state === d.generatorReady || r.state === d.slrmReady) && e.exactSolution !== void 0 && (e.exactSolution === !0 ? r.exactSolution = !0 : r.exactSolution = !1, t?.setExactSolution(r.exactSolution), a?.log(
        "Exact solution for singularity set to: ",
        r.exactSolution
      ));
      break;
    case "set_joint_weights":
      (r.state === d.generatorReady || r.state === d.slrmReady) && e.jointNumber !== void 0 && e.jointWeight !== void 0 && t?.setJointWeight && t?.setJointWeight(e.jointNumber, e.jointWeight) !== !0 && a?.error(
        "set_joint_weights: failed to set weight for joint number ",
        e.jointNumber
      );
      break;
    case "set_joint_desirable_vlimit":
      (r.state === d.generatorReady || r.state === d.slrmReady) && (e.jointNumber === void 0 && (e.jointNumber = -1), e.velocityLimit !== void 0 && t?.setJointDesirableVelocityLimit && t?.setJointDesirableVelocityLimit(
        e.jointNumber,
        e.velocityLimit
      ) !== !0 && a?.error(
        "set_joint_desirable_vlimit: failed to set desirable velocity limit for joint number ",
        e.jointNumber
      ));
      break;
    case "clear_joint_desirable":
      (r.state === d.generatorReady || r.state === d.slrmReady) && e.jointNumber !== void 0 && t?.setJointDesirable && t?.setJointDesirable(e.jointNumber, !1) !== !0 && a?.error(
        "clear_joint_desirable: failed to clear desirable for joint number ",
        e.jointNumber
      );
      break;
    case "set_joint_desirable":
      a?.debug("in worker, set_joint_desirable called:", e), (r.state === d.generatorReady || r.state === d.slrmReady) && e.jointNumber !== void 0 && e.lower !== void 0 && e.upper !== void 0 && e.gain !== void 0 && (a?.debug(
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
      ) !== !0 && a?.error(
        "set_joint_desirable: failed to set desirable for joint number ",
        e.jointNumber
      ));
      break;
    // case 'set_linear_velocity_limit':
    // case 'set_angular_velocity_limit':
    // case 'set_linear_gain':
    // case 'set_angular_gain':
    case "set_joint_velocity_limit":
      if (r.state === d.generatorReady || r.state === d.slrmReady)
        if (e.velocityLimit !== void 0) {
          const s = k(e.velocityLimit);
          t?.setJointVelocityLimitSingle(s) !== !0 && a?.error("set_joint_velocity_limit: failed to set joint velocity limit"), s.delete();
        } else
          a?.error("set_joint_velocity_limit: velocityLimit is undefined");
      break;
    case "set_ignore_collisions":
      (r.state === d.generatorReady || r.state === d.slrmReady) && e.ignoreCollisions !== void 0 && (r.ignoreCollision = e.ignoreCollisions, a?.log(
        "Ignore collisions set to: ",
        r.ignoreCollision
      ));
      break;
    case "set_ignore_joint_limits":
      (r.state === d.generatorReady || r.state === d.slrmReady) && e.ignoreJointLimits !== void 0 && (r.ignoreJointLimits = e.ignoreJointLimits, a?.log("Ignore joint limits set to: ", r.ignoreJointLimits));
      break;
    case "set_joint_limit_keep_moving":
      a?.debug("Joint limit keep moving: command received"), a?.debug("data:", e), a?.debug("arg:", e.jointLimitKeepMoving), a?.debug("calcObj.state:", r.state), (r.state === d.generatorReady || r.state === d.slrmReady) && e.jointLimitKeepMoving !== void 0 && (r.jointLimitKeepMoving = e.jointLimitKeepMoving, a?.log(
        "Joint limit keep moving set to: ",
        r.jointLimitKeepMoving
      ));
      break;
  }
};
function K(n = performance.now() - r.timeInterval) {
  const e = performance.now(), t = e - n;
  if (r.step(t / 1e3), O === !0) {
    self.postMessage({ type: "shutdown_complete" }), a?.log("main loop was finished"), self.close();
    return;
  }
  if (p.socket) {
    const s = performance.now() - e, o = Math.floor(s / 1e3), l = Math.floor((s - o * 1e3) * 1e6), c = {
      topic: "timeRef",
      javascriptStamp: Date.now(),
      header: { frame_id: "none" },
      time_ref: {
        sec: o,
        nanosec: l
      },
      source: "slrm_and_cd"
    }, f = W(c);
    p.socket.readyState === WebSocket.OPEN && p.socket.send(f);
  }
  setTimeout(() => K(e), 0);
}
r.state = d.waitingRobotType;
self.postMessage({ type: "ready" });
K();
function pe(n) {
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
function ye(n) {
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
function N(n, e) {
  function t(c, f) {
    const h = new c.DoubleVector();
    for (let m = 0; m < f.length; ++m)
      h.push_back(f[m]);
    return h;
  }
  function i(c, f) {
    const h = new c.JointModelFlatStructVector();
    for (let m = 0; m < f.length; ++m)
      h.push_back(f[m]);
    return h;
  }
  const s = {
    revolute: n.JointType.Revolute,
    continuous: n.JointType.Continuous,
    prismatic: n.JointType.Prismatic,
    fixed: n.JointType.Fixed,
    floating: n.JointType.Floating,
    planar: n.JointType.Planar
  }, o = e.map((c) => {
    const f = c.origin.$.xyz ?? [0, 0, 0], h = t(
      n,
      Array.isArray(f) && f.length === 3 ? f : [0, 0, 0]
    ), m = c.origin.$.rpy ?? [0, 0, 0], T = t(
      n,
      Array.isArray(m) && m.length === 3 ? m : [0, 0, 0]
    ), L = c.axis?.$?.xyz ?? [0, 0, 1], j = t(
      n,
      Array.isArray(L) && L.length === 3 ? L : [0, 0, 1]
    );
    let _ = s[c.$?.type];
    _ || (a?.error(
      "Unknown joint type string:",
      c.$?.type,
      "setting to fixed"
    ), _ = s.fixed);
    const U = new n.JointModelFlatStruct(j, h, T, _);
    return j.delete(), h.delete(), T.delete(), U;
  });
  return { jointModelVector: i(n, o), jointModelsArray: o };
}
function be(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  n.forEach((l) => {
    const c = l.parent.$.link, f = l.child.$.link;
    e.has(c) || e.set(c, []), e.get(c).push(l), t.set(f, (t.get(f) || 0) + 1), t.has(c) || t.set(c, 0), i.set(f, l);
  });
  const s = [];
  for (const [l, c] of t.entries())
    c === 0 && s.push(l);
  const o = [];
  for (; s.length > 0; ) {
    const l = s.shift(), c = e.get(l) || [];
    for (const f of c) {
      const h = f.child.$.link;
      o.push(f), t.set(h, t.get(h) - 1), t.get(h) === 0 && s.push(h);
    }
  }
  return o.length !== n.length && a?.warn("Cycle detected or disconnected components in URDF joints"), o;
}
function Q(n, e) {
  for (const t in e) {
    if (!(t in n)) {
      a?.debug("key in update.json:", t, " ignored");
      continue;
    }
    const i = e[t], s = n[t];
    i !== null && typeof i == "object" && !Array.isArray(i) && s !== null && typeof s == "object" && !Array.isArray(s) ? Q(s, i) : (a?.warn("key:", t, "val:", n[t], "is replaced by", i), n[t] = i);
  }
  return n;
}
