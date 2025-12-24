/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.Properties;

public class MavenWrapperDownloader {
    private static final String WRAPPER_VERSION = "0.5.6";
    private static final URL DEFAULT_DOWNLOAD_URL =
            url("https://repo.maven.apache.org/maven2/io/takari/maven-wrapper/"
                    + WRAPPER_VERSION + "/maven-wrapper-" + WRAPPER_VERSION + ".jar");

    public static void main(String[] args) throws Exception {
        File baseDirectory = new File(args[0]);
        System.out.println("- Downloading maven-wrapper.jar from: " + DEFAULT_DOWNLOAD_URL);

        File outputFile = new File(baseDirectory.getAbsolutePath(), ".mvn/wrapper/maven-wrapper.jar");
        if (!outputFile.getParentFile().exists()) {
            if (!outputFile.getParentFile().mkdirs()) {
                System.out.println("- ERROR creating output directory '" + outputFile.getParentFile().getAbsolutePath() + "'");
                System.exit(1);
            }
        }
        System.out.println("- Downloading to: " + outputFile.getAbsolutePath());

        try {
            downloadFileFromURL(DEFAULT_DOWNLOAD_URL, outputFile);
            System.out.println("Done");
            System.exit(0);
        } catch (Throwable e) {
            System.out.println("- Error downloading " + DEFAULT_DOWNLOAD_URL);
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void downloadFileFromURL(URL website, File destination) throws IOException {
        ReadableByteChannel rbc = Channels.newChannel(website.openStream());
        FileOutputStream fos = new FileOutputStream(destination);
        fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
        fos.close();
        rbc.close();
    }

    private static URL url(String address) throws Exception {
        return new URL(address);
    }
}
