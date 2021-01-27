var REVA = /\w*[nN][tT][vV][aA]\w*/,
    REDC = /\w*[nN][tT][dD][cC]\w*/,
    REMD = /\w*[nN][tT][mM][dD]\w*/,
    fileNum = '20ntva12345';

    switch (true) {
      case REVA.test(fileNum):
          stateName = "Virginia";
          break;
      case REDC.test(samplestring):
        stateName = "District of COlumbia";
          break;
      case REMD.test(samplestring):
        stateName = "Maryland";
          break;
  }